/**
 * ADVANCED TEST - Tool Selection + Answer Validation
 * Tests both tool selection and answer accuracy
 */

import 'dotenv/config';
import Groq from 'groq-sdk';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { dispatchTool } from '../src/lib/toolDispatcher.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const problemsData = JSON.parse(
  fs.readFileSync(join(__dirname, 'data', 'advanced-problems.json'), 'utf-8')
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

function compareResults(actual, expected, tolerance) {
  // Check if all expected keys exist in actual and match within tolerance
  for (const key in expected) {
    if (!(key in actual)) {
      console.log(`   Missing key: ${key}`);
      return false;
    }
    
    const actualVal = actual[key];
    const expectedVal = expected[key];
    
    // Handle numeric comparisons
    if (typeof expectedVal === 'number' && typeof actualVal === 'number') {
      const diff = Math.abs(actualVal - expectedVal);
      if (diff > tolerance) {
        console.log(`   ${key}: expected ${expectedVal}, got ${actualVal}, diff ${diff.toFixed(6)}`);
        return false;
      }
    } else if (actualVal !== expectedVal) {
      console.log(`   ${key}: expected ${expectedVal}, got ${actualVal}`);
      return false;
    }
  }
  return true;
}

async function testProblem(groq, problem, index, total) {
  console.log(`\n[${index + 1}/${total}] ${problem.difficulty.toUpperCase()}`);
  console.log(`Q: ${problem.question}`);

  let toolScore = 0;
  let answerScore = 0;

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
      const toolArgs = JSON.parse(toolCalls[0].function.arguments);
      
      // Check tool selection
      const toolCorrect = toolName === problem.expectedTool;
      if (toolCorrect) {
        toolScore = 50;
        console.log(`✅ Tool: ${toolName} (+50)`);
        
        // Check answer accuracy
        try {
          const result = dispatchTool(toolName, toolArgs);
          const answerCorrect = compareResults(result, problem.expectedAnswer, problem.tolerance);
          
          if (answerCorrect) {
            answerScore = 50;
            console.log(`✅ Answer: Correct (+50)`);
          } else {
            console.log(`❌ Answer: Incorrect`);
            console.log(`   Expected: ${JSON.stringify(problem.expectedAnswer)}`);
            console.log(`   Got: ${JSON.stringify(result)}`);
          }
        } catch (err) {
          console.log(`❌ Answer validation error: ${err.message}`);
        }
      } else {
        console.log(`❌ Tool: ${toolName} (Expected: ${problem.expectedTool})`);
      }
      
      const totalScore = toolScore + answerScore;
      console.log(`Score: ${totalScore}/100`);
      
      return {
        success: totalScore === 100,
        toolScore,
        answerScore,
        totalScore,
        tool: toolName
      };
    }

    console.log('❌ No tool called');
    console.log('Score: 0/100');
    return { success: false, toolScore: 0, answerScore: 0, totalScore: 0, error: 'No tool call' };
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    console.log('Score: 0/100');
    return { success: false, toolScore: 0, answerScore: 0, totalScore: 0, error: error.message };
  }
}

async function runTests() {
  console.log('='.repeat(60));
  console.log('MATHF4-O ADVANCED TEST - Tool + Answer Validation');
  console.log('='.repeat(60));

  const groq = getGroqClient();
  const args = process.argv.slice(2);
  const limit = args.find(a => a.startsWith('--limit='))?.split('=')[1];
  const random = args.includes('--random');
  const difficulty = args.find(a => a.startsWith('--difficulty='))?.split('=')[1];
  
  let problems = problemsData.problems;
  
  if (difficulty) {
    problems = problems.filter(p => p.difficulty === difficulty);
  }
  
  if (random) {
    problems = problems.sort(() => Math.random() - 0.5);
  }
  
  if (limit) {
    problems = problems.slice(0, parseInt(limit));
  }

  console.log(`Running ${problems.length} tests...\n`);

  const results = [];
  for (let i = 0; i < problems.length; i++) {
    const result = await testProblem(groq, problems[i], i, problems.length);
    results.push({ id: problems[i].id, difficulty: problems[i].difficulty, ...result });
    if (i < problems.length - 1) await new Promise(r => setTimeout(r, 2000));
  }

  const avgScore = (results.reduce((sum, r) => sum + r.totalScore, 0) / results.length).toFixed(1);
  const passed = results.filter(r => r.success).length;

  console.log('\n' + '='.repeat(60));
  console.log(`⭐ AVERAGE SCORE: ${avgScore}/100`);
  console.log(`✅ PASSED: ${passed}/${results.length}`);
  console.log('='.repeat(60));

  fs.writeFileSync(
    join(__dirname, 'results', 'advanced-results.json'),
    JSON.stringify({ 
      results, 
      summary: { 
        avgScore: parseFloat(avgScore), 
        passed, 
        total: results.length 
      } 
    }, null, 2)
  );
  
  console.log('\nResults saved to tests/results/advanced-results.json');
}

runTests().catch(console.error);
