/**
 * Test the specific matrix problem from the screenshot
 * "Find determinant of matrix [[2, 1], [3, 4]]"
 */

import Groq from 'groq-sdk';
import { dispatchTool } from '../src/lib/toolDispatcher.js';
import { mathTools } from '../src/lib/aiTools.js';
import { MATH_AGENT_SYSTEM_PROMPT } from '../src/lib/systemPrompt.js';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.VITE_GROQ_API_KEY });

console.log('============================================================');
console.log('TESTING MATRIX DETERMINANT FIX');
console.log('============================================================\n');

const testQuestion = "Find determinant of matrix [[2, 1], [3, 4]]";

console.log(`Question: ${testQuestion}\n`);
console.log('Sending to AI...\n');

try {
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: MATH_AGENT_SYSTEM_PROMPT },
      { role: 'user', content: testQuestion }
    ],
    tools: mathTools.map(tool => ({
      type: 'function',
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters
      }
    })),
    tool_choice: 'auto',
    temperature: 0.1,
    max_tokens: 500
  });

  const message = response.choices[0].message;

  if (message.tool_calls && message.tool_calls.length > 0) {
    const toolCall = message.tool_calls[0];
    const toolName = toolCall.function.name;
    const toolArgs = JSON.parse(toolCall.function.arguments);

    console.log(`✅ AI Selected Tool: ${toolName}`);
    console.log(`📝 Arguments:`, toolArgs);
    console.log('');

    // Execute the tool
    try {
      const result = dispatchTool(toolName, toolArgs);
      console.log(`✅ Tool Executed Successfully!`);
      console.log(`📊 Result:`, result);
      console.log('');

      // Verify the answer
      const expectedDeterminant = (2 * 4) - (1 * 3); // = 8 - 3 = 5
      if (result.determinant === expectedDeterminant) {
        console.log(`✅ CORRECT ANSWER: ${result.determinant}`);
        console.log(`   Expected: ${expectedDeterminant}`);
        console.log('');
        console.log('🎉 MATRIX DETERMINANT FIX VERIFIED!');
        console.log('   The "Unknown tool" error is now FIXED!');
      } else {
        console.log(`❌ Wrong answer: ${result.determinant} (expected ${expectedDeterminant})`);
      }
    } catch (dispatchError) {
      console.log(`❌ Tool Dispatch Error: ${dispatchError.message}`);
      console.log('   This means the tool name is still not in the dispatcher!');
    }
  } else {
    console.log('❌ No tool call made by AI');
    console.log('Response:', message.content);
  }

} catch (error) {
  console.log(`❌ API Error: ${error.message}`);
}

console.log('\n============================================================');
