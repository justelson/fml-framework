/**
 * SIMPLE TEST - Tool Selection Only
 * Tests if AI selects the correct tool for each problem
 */

import 'dotenv/config';
import Groq from 'groq-sdk';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const problemsData = JSON.parse(
  fs.readFileSync(join(__dirname, 'data', 'test-problems.json'), 'utf-8')
);

const SYSTEM_PROMPT = `You are a Form 4 math problem solver. Analyze each problem and select the correct tool.`;

const mathTools = JSON.parse(
  fs.readFileSync(join(__dirname, 'data', 'tool-definitions.json'), 'utf-8')
).tools;

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error('API key required');
  return new Groq({ apiKey });
}

async function testProblem(groq, problem, index, total) {
  console.log(`\n[${index + 1}/${total}] ${problem.category}`);
  console.log(`Q: ${problem.question}`);

  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: problem.question }
      ],
      tools: mathTools,
      tool_choice: 'auto',
      temperature: 0.1,
    });

    const toolCalls = response.choices[0].message.tool_calls;
    if (toolCalls && toolCalls.length > 0) {
      const toolName = toolCalls[0].function.name;
      const isCorrect = toolName === problem.expectedTool;
      
      console.log(`Tool: ${toolName} ${isCorrect ? '✅' : '❌'}`);
      if (!isCorrect) {
        console.log(`Expected: ${problem.expectedTool}`);
      }
      return { success: isCorrect, tool: toolName };
    }

    console.log('❌ No tool called');
    return { success: false, error: 'No tool call' };
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('='.repeat(60));
  console.log('MATHF4-O SIMPLE TEST - Tool Selection');
  console.log('='.repeat(60));

  const groq = getGroqClient();
  const args = process.argv.slice(2);
  const limit = args.find(a => a.startsWith('--limit='))?.split('=')[1];
  
  let problems = problemsData.problems;
  if (limit) problems = problems.slice(0, parseInt(limit));

  console.log(`Running ${problems.length} tests...\n`);

  const results = [];
  for (let i = 0; i < problems.length; i++) {
    const result = await testProblem(groq, problems[i], i, problems.length);
    results.push({ id: problems[i].id, ...result });
    if (i < problems.length - 1) await new Promise(r => setTimeout(r, 2000));
  }

  const passed = results.filter(r => r.success).length;
  const rate = ((passed / results.length) * 100).toFixed(1);

  console.log('\n' + '='.repeat(60));
  console.log(`RESULTS: ${passed}/${results.length} passed (${rate}%)`);
  console.log('='.repeat(60));

  fs.writeFileSync(
    join(__dirname, 'results', 'simple-results.json'),
    JSON.stringify({ results, summary: { passed, total: results.length, rate } }, null, 2)
  );
  
  console.log('\nResults saved to tests/results/simple-results.json');
}

runTests().catch(console.error);
