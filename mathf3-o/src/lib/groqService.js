/**
 * Groq Service
 * Handles communication with the Groq API and sequences tool calls.
 */

import Groq from 'groq-sdk';
import { mathTools } from './aiTools.js';
import { MATH_AGENT_SYSTEM_PROMPT } from './systemPrompt.js';
import { dispatchTool } from './toolDispatcher.js';

// Initialize Groq client
// We will create the client dynamically to allow for runtime key updates from Settings
const getGroqClient = () => {
    // 1. Check LocalStorage (User Settings)
    const localKey = localStorage.getItem('groqApiKey');
    if (localKey && localKey.trim().length > 0) {
        return new Groq({ apiKey: localKey, dangerouslyAllowBrowser: true });
    }

    // 2. Fallback to Environment Variable
    const envKey = import.meta.env.VITE_GROQ_API_KEY;
    if (envKey) {
        return new Groq({ apiKey: envKey, dangerouslyAllowBrowser: true });
    }

    return null;
};

/**
 * Sends a user prompt to Groq, handles any tool calls, and returns the final result.
 * @param {string} userPrompt - The user's natural language query.
 * @returns {Promise<any>} - The final structured result or message.
 */
export async function getAiResponse(userPrompt) {
    const groq = getGroqClient();

    if (!groq) {
        throw new Error('Missing API Key. Please enter your Groq API Key in the Settings tab.');
    }

    const maxRetries = 2;
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const messages = [
                { role: 'system', content: MATH_AGENT_SYSTEM_PROMPT },
                { role: 'user', content: userPrompt }
            ];

            // Call Groq with tools
            const runner = await groq.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                tools: mathTools.map(tool => ({
                    type: 'function',
                    function: {
                        name: tool.name,
                        description: tool.description,
                        parameters: tool.parameters,
                    }
                })),
                tool_choice: 'auto',
                temperature: 0.2, // Slightly higher for better explanations
            });

            const completion = runner.choices[0].message;
            let toolCalls = completion.tool_calls;

            // Pattern 1: Native tool_calls (Standard OpenAI compatible)
            if (toolCalls && toolCalls.length > 0) {
                const toolCall = toolCalls[0];
                const functionName = toolCall.function.name;
                const functionArgs = JSON.parse(toolCall.function.arguments);

                console.log(`[AI] Calling Tool: ${functionName}`, functionArgs);

                try {
                    const result = dispatchTool(functionName, functionArgs);
                    
                    // Make a follow-up call to get an explanation
                    const explanationMessages = [
                        { role: 'system', content: `You are a helpful math tutor. Provide a JSON response with exactly two fields:

1. "brief": A conversational 2-3 sentence explanation that:
   - States what the problem asked us to find
   - Mentions which formula/method we applied
   - States the final answer
   Example: "The problem asked us to find the 10th term of an arithmetic progression with first term 5 and common difference 3. We applied the arithmetic progression formula aₙ = a + (n-1)d to solve this. After substituting the values and calculating, we found that the 10th term is 32."

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
                    
                    // Remove markdown code blocks if present
                    explanation = explanation.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
                    
                    // Try to parse as JSON first
                    try {
                        const parsed = JSON.parse(explanation);
                        console.log('[AI] Parsed explanation:', parsed);
                        if (parsed.brief && parsed.detailed) {
                            brief = parsed.brief;
                            detailed = parsed.detailed;
                        } else {
                            // Fallback: use the whole response as detailed
                            console.warn('[AI] Missing brief or detailed fields, using fallback');
                            detailed = explanation;
                        }
                    } catch (e) {
                        // Not JSON, use as detailed explanation
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

            // Pattern 2: JSON content (Mental Chain or Direct Answer)
            const content = completion.content;
            if (content) {
                try {
                    const jsonContent = JSON.parse(content);

                    // Check if the JSON content *is* a tool call structure
                    if (jsonContent.tool && jsonContent.args) {
                        const result = dispatchTool(jsonContent.tool, jsonContent.args);
                        return {
                            type: 'tool_result',
                            tool: jsonContent.tool,
                            result: result,
                            explanation: jsonContent.explanation || null
                        };
                    }

                    // Check if it's an error message
                    if (jsonContent.error) {
                        return { type: 'error', message: jsonContent.error };
                    }

                    // Check if it's a casual chat message
                    if (jsonContent.message) {
                        return { type: 'message', message: jsonContent.message };
                    }

                    // Otherwise, it's just a raw message
                    return { type: 'message', message: JSON.stringify(jsonContent) };

                } catch (e) {
                    // If content isn't JSON, just return text
                    return { type: 'message', message: content };
                }
            }

            // No valid response, retry
            lastError = 'No response from AI';
            if (attempt < maxRetries) {
                console.log(`[AI] Retrying... (${attempt}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

        } catch (error) {
            console.error('Groq API Error:', error);
            lastError = error.message;
            
            // If rate limited, wait and retry
            if (error.message?.includes('rate_limit') || error.message?.includes('429')) {
                if (attempt < maxRetries) {
                    console.log('[AI] Rate limited, waiting 3 seconds...');
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    continue;
                }
            }
            
            // If it's a tool use error, retry once
            if (error.message?.includes('tool_use_failed') && attempt < maxRetries) {
                console.log('[AI] Tool use failed, retrying...');
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            
            throw error;
        }
    }

    return { type: 'error', message: lastError || 'Failed after retries' };
}
