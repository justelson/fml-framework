/**
 * ADVANCED TEST - Full Validation
 * Tests tool selection AND answer accuracy
 * Scoring: 50% tool + 50% answer = 100%
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

const SYSTEM_PROMPT = `You are a mathematical problem solver with access to specialized calculation tools.

Analyze each problem carefully:
1. Identify the mathematical concept
2. Extract all necessary parameters
3. Select the appropriate tool
4. Call it with correct arguments

Think step by step and reason through ambiguous problems.`;

const mathTools = JSON.parse(
  fs.readFileSync(join(__dirname, 'data', 'tool-definitions.json'), 'utf-8')
).tools;

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error('API key required');
  return new Groq({ apiKey });
}

function compareValues(actual, expected, tolerance) {
  if (typeof expected === 'number') {
    return Math.abs(actual - expected) <= tolerance;
  }
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual) || actual.length !== expected.length) return false;
    const sortedActual = [...actual].sort((a, b) => a - b);
    const sortedExpected = [...expected].sort((a, b) => a - b);
    return sortedExpected.every((val, i) => Math.abs(sortedActual[i] - val) <= tolerance);
  }
  if (typeof expected === 'object') {
    return Object.keys(expected).every(key => {
      if (!(key in actual)) return false;
      return compareValues(actual[key], expected[key], tolerance);
    });
  }
  return actual === expected;
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
      const args = JSON.parse(toolCalls[0].function.arguments);

      // Check tool (50 points)
      if (toolName === problem.expectedTool) {
        toolScore = 50;
        console.log(`✅ Tool: ${toolName} (+50)`);

        // Check answer (50 points)
        try {
          const result = dispatchTool(toolName, args);
          if (compareValues(result, problem.expectedAnswer, problem.tolerance)) {
            answerScore = 50;
            console.log(`✅ Answer: Correct (+50)`);
          } else {
            console.log(`❌ Answer: Wrong (0)`);
          }
        } catch (err) {
          console.log(`❌ Computation error: ${err.message}`);
        }
      } else {
        console.log(`❌ Tool: ${toolName} (expected ${problem.expectedTool})`);
      }
    } else {
      console.log('❌ No tool called');
    }

    const total = toolScore + answerScore;
    console.log(`Score: ${total}/100`);
    return { success: total === 100, toolScore, answerScore, totalScore: total };

  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return { success: false, toolScore: 0, answerScore: 0, totalScore: 0, error: error.message };
  }
}

async function runTests() {
  console.log('='.repeat(70));
  console.log('ADVANCED TEST - Tool + Answer Validation');
  console.log('='.repeat(70));
  console.log('Scoring: 50% Tool Selection + 50% Correct Answer\n');

  const groq = getGroqClient();
  const args = process.argv.slice(2);
  
  const limit = args.find(a => a.startsWith('--limit='))?.split('=')[1];
  const random = args.includes('--random');
  const difficulty = args.find(a => a.startsWith('--difficulty='))?.split('=')[1];

  let problems = problemsData.problems;
  
  if (difficulty) {
    problems = problems.filter(p => p.difficulty === difficulty);
    console.log(`Filter: ${difficulty} (${problems.length} tests)`);
  }
  
  if (random) {
    problems = problems.sort(() => Math.random() - 0.5);
    console.log('Random order enabled');
  }
  
  if (limit) {
    problems = problems.slice(0, parseInt(limit));
    console.log(`Limit: ${limit} tests`);
  }

  console.log(`\nRunning ${problems.length} tests...\n`);

  const results = [];
  let totalScore = 0;

  for (let i = 0; i < problems.length; i++) {
    const result = await testProblem(groq, problems[i], i, problems.length);
    results.push({ id: problems[i].id, difficulty: problems[i].difficulty, ...result });
    totalScore += result.totalScore;
    if (i < problems.length - 1) await new Promise(r => setTimeout(r, 2000));
  }

  const perfect = results.filter(r => r.totalScore === 100).length;
  const partial = results.filter(r => r.totalScore > 0 && r.totalScore < 100).length;
  const failed = results.filter(r => r.totalScore === 0).length;
  const avgScore = (totalScore / results.length).toFixed(1);

  console.log('\n' + '='.repeat(70));
  console.log('RESULTS');
  console.log('='.repeat(70));
  console.log(`Perfect (100%): ${perfect}`);
  console.log(`Partial (1-99%): ${partial}`);
  console.log(`Failed (0%): ${failed}`);
  console.log(`\n⭐ AVERAGE SCORE: ${avgScore}/100`);
  console.log('='.repeat(70));

  fs.writeFileSync(
    join(__dirname, 'results', 'advanced-results.json'),
    JSON.stringify({
      results,
      summary: { total: results.length, perfect, partial, failed, averageScore: parseFloat(avgScore) }
    }, null, 2)
  );
}

runTests().catch(console.error);
