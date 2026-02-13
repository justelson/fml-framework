/**
 * Groq Service for Form 4 Mathematics
 * Handles communication with the Groq API and tool calls
 */

import Groq from 'groq-sdk';
import { mathTools } from './aiTools.js';
import { MATH_AGENT_SYSTEM_PROMPT } from './systemPrompt.js';
import { dispatchTool } from './toolDispatcher.js';

const getGroqClient = () => {
    const localKey = localStorage.getItem('groqApiKey');
    if (localKey && localKey.trim().length > 0) {
        return new Groq({ apiKey: localKey, dangerouslyAllowBrowser: true });
    }

    const envKey = import.meta.env.VITE_GROQ_API_KEY;
    if (envKey) {
        return new Groq({ apiKey: envKey, dangerouslyAllowBrowser: true });
    }

    return null;
};

export async function getAiResponse(userPrompt) {
    const groq = getGroqClient();

    if (!groq) {
        throw new Error('Missing API Key. Please enter your Groq API Key in the Settings tab.');
    }

    const maxRetries = 3;
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const messages = [
                { role: 'system', content: MATH_AGENT_SYSTEM_PROMPT },
                { role: 'user', content: userPrompt }
            ];

            const runner = await groq.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                tools: mathTools.map(tool => ({
                    type: 'function',
                    function: {
                        name: tool.name,
                        description: tool.description,
                        parameters: tool.parameters,
                        strict: false
                    }
                })),
                tool_choice: 'auto',
                temperature: 0.1,
                max_tokens: 1000
            });

            const completion = runner.choices[0].message;
            let toolCalls = completion.tool_calls;

            if (toolCalls && toolCalls.length > 0) {
                const toolCall = toolCalls[0];
                const functionName = toolCall.function.name;
                
                let functionArgs;
                try {
                    functionArgs = JSON.parse(toolCall.function.arguments);
                } catch (parseError) {
                    console.error('[AI] Failed to parse tool arguments:', toolCall.function.arguments);
                    throw new Error('Invalid tool arguments format');
                }

                console.log(`[AI] Calling Tool: ${functionName}`, functionArgs);

                try {
                    const result = dispatchTool(functionName, functionArgs);

                    const explanationMessages = [
                        {
                            role: 'system', content: `You are a helpful math tutor. Provide a JSON response with exactly two fields:

1. "brief": A conversational 2-3 sentence explanation that:
   - States what the problem asked us to find
   - Mentions which formula/method we applied
   - States the final answer
   Example: "The problem asked us to find the gradient of a line through two points. We applied the gradient formula m = (y₂-y₁)/(x₂-x₁) to solve this. After substituting the values and calculating, we found that the gradient is 2."

2. "detailed": Bullet points using markdown with **bold** for formulas and key values:
   - **Formula:** [the formula used]
   - **Given:** [list all given values]
   - **Calculation:** [show step-by-step work]
   - **Result:** [final answer with units]

IMPORTANT: Return ONLY valid JSON. Example:
{"brief":"The problem asked us to find X. We applied formula Y and got answer Z.","detailed":"- **Formula:** ...\\n- **Given:** ...\\n- **Calculation:** ...\\n- **Result:** ..."}` },
                        { role: 'user', content: `Tool: ${functionName}\nInputs: ${JSON.stringify(functionArgs)}\nResult: ${JSON.stringify(result)}\n\nProvide a conversational brief explanation (what was asked, what we did, what we got) and detailed step-by-step breakdown in JSON format.` }
                    ];

                    const explanationResponse = await groq.chat.completions.create({
                        model: 'llama-3.3-70b-versatile',
                        messages: explanationMessages,
                        temperature: 0.3,
                        response_format: { type: "json_object" }
                    });

                    let explanation = explanationResponse.choices[0].message.content;
                    let brief = null;
                    let detailed = null;

                    console.log('[AI] Raw explanation response:', explanation);

                    explanation = explanation.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

                    try {
                        const parsed = JSON.parse(explanation);
                        console.log('[AI] Parsed explanation:', parsed);
                        if (parsed.brief && parsed.detailed) {
                            brief = parsed.brief;
                            detailed = parsed.detailed;
                        } else {
                            console.warn('[AI] Missing brief or detailed fields, using fallback');
                            detailed = explanation;
                        }
                    } catch (e) {
                        console.warn('[AI] Failed to parse JSON explanation:', e.message);
                        detailed = explanation;
                    }

                    return {
                        type: 'tool_result',
                        tool: functionName,
                        result: result,
                        explanation: detailed,
                        brief: brief
                    };
                } catch (err) {
                    return { type: 'error', message: err.message };
                }
            }

            const content = completion.content;
            if (content) {
                return { type: 'message', message: content };
            }

            lastError = 'No response from AI';
            if (attempt < maxRetries) {
                console.log(`[AI] Retrying... (${attempt}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

        } catch (error) {
            console.error('Groq API Error:', error);
            lastError = error.message;

            if (error.message?.includes('rate_limit') || error.message?.includes('429')) {
                if (attempt < maxRetries) {
                    console.log('[AI] Rate limited, waiting 3 seconds...');
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    continue;
                }
            }

            if (error.message?.includes('tool_use_failed')) {
                if (attempt < maxRetries) {
                    console.log(`[AI] Tool use failed, retrying with adjusted temperature... (${attempt}/${maxRetries})`);
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    continue;
                } else {
                    // On final attempt, provide helpful error message
                    return { 
                        type: 'error', 
                        message: 'The AI had trouble formatting the function call. Please try rephrasing your question or breaking it into simpler parts.' 
                    };
                }
            }

            if (attempt >= maxRetries) {
                throw error;
            }
        }
    }

    return { type: 'error', message: lastError || 'Failed after retries' };
}
