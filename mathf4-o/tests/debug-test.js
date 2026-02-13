/**
 * DEBUG TEST - See exactly what AI is doing
 */

import 'dotenv/config';
import Groq from 'groq-sdk';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mathTools = JSON.parse(
  fs.readFileSync(join(__dirname, 'data', 'tool-definitions.json'), 'utf-8')
).tools;

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error('API key required');
  return new Groq({ apiKey });
}

async function debugTest() {
  const groq = getGroqClient();
  
  const question = "What's the gradient of a line through (2, 3) and (5, 9)?";
  
  console.log('Question:', question);
  console.log('\nSending to AI...\n');
  
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: 'You are a Form 4 math problem solver. Analyze each problem and select the correct tool.' },
      { role: 'user', content: question }
    ],
    tools: mathTools,
    tool_choice: 'auto',
    temperature: 0.1,
  });

  const toolCalls = response.choices[0].message.tool_calls;
  
  if (toolCalls && toolCalls.length > 0) {
    const toolCall = toolCalls[0];
    console.log('Tool Selected:', toolCall.function.name);
    console.log('Arguments:', toolCall.function.arguments);
    
    const args = JSON.parse(toolCall.function.arguments);
    console.log('\nParsed Arguments:', args);
    
    // Now test the actual function
    const { calculateGradient } = await import('../src/lib/math.js');
    const result = calculateGradient(args.x1, args.y1, args.x2, args.y2);
    console.log('\nFunction Result:', result);
  }
}

debugTest().catch(console.error);
