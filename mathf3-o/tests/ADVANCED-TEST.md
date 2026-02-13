# Advanced Test Documentation

Comprehensive testing that validates both tool selection AND answer accuracy with ambiguous questions.

## Purpose

Validates that the AI can:
- Understand ambiguous/confusing questions
- Reason through problems without explicit concept names
- Select the correct tool
- Compute accurate answers

## Scoring System

**Two-Part Scoring:**
- **50 points**: Correct tool selection
- **50 points**: Correct answer computation
- **Total**: 100 points per test

### Score Interpretation
- **100%**: Perfect (correct tool + correct answer)
- **50%**: Partial (correct tool, wrong answer)
- **0%**: Failed (wrong tool or error)

## Usage

### Basic Commands

```bash
# Run all tests (25 problems)
npm run test:advanced

# Run limited tests
npm run test:advanced:quick    # 5 tests
```

### Advanced Options

```bash
# Random selection
npm run test:advanced:random   # 10 random tests

# Filter by difficulty
npm run test:advanced:easy     # Only easy problems
npm run test:advanced:medium   # Only medium problems
npm run test:advanced:hard     # Only hard problems

# Custom combinations
node tests/advanced-test.js --random --limit=15
node tests/advanced-test.js --difficulty=hard --limit=5
```

## Output Format

```
======================================================================
ADVANCED TEST - Tool + Answer Validation
======================================================================
Scoring: 50% Tool Selection + 50% Correct Answer

Running 5 tests...

[1/5] EASY
Q: If I plug 5 into y = 3x + 7, what do I get?
✅ Tool: calculateLinearY (+50)
✅ Answer: Correct (+50)
Score: 100/100

[2/5] MEDIUM
Q: Something squared minus 5 times itself plus 6 equals zero. What are the solutions?
✅ Tool: solveQuadraticRoots (+50)
✅ Answer: Correct (+50)
Score: 100/100

[3/5] HARD
Q: A parabola is defined by 2x² - 8x + 5. Where does it reach its minimum or maximum point?
✅ Tool: findQuadraticVertex (+50)
✅ Answer: Correct (+50)
Score: 100/100

======================================================================
RESULTS
======================================================================
Perfect (100%): 5
Partial (1-99%): 0
Failed (0%): 0

⭐ AVERAGE SCORE: 100.0/100
======================================================================
```

## Results File

Results saved to `tests/results/advanced-results.json`:

```json
{
  "results": [
    {
      "id": 1,
      "difficulty": "easy",
      "success": true,
      "toolScore": 50,
      "answerScore": 50,
      "totalScore": 100
    }
  ],
  "summary": {
    "total": 5,
    "perfect": 5,
    "partial": 0,
    "failed": 0,
    "averageScore": 100.0
  }
}
```

## Test Data

Located in `tests/data/advanced-problems.json`:

```json
{
  "problems": [
    {
      "id": 1,
      "difficulty": "easy",
      "question": "If I plug 5 into y = 3x + 7, what do I get?",
      "expectedTool": "calculateLinearY",
      "expectedAnswer": { "y": 22 },
      "tolerance": 0.01
    }
  ]
}
```

### Field Descriptions

- **difficulty**: `easy`, `medium`, or `hard`
- **question**: Ambiguous/natural language question
- **expectedTool**: Exact tool name
- **expectedAnswer**: Expected result object/value
- **tolerance**: Acceptable error margin for floating point

## Difficulty Levels

### Easy
- Clear parameters
- Common concepts
- Straightforward language
- Example: "A round shape has radius 7. Find area."

### Medium
- Some ambiguity
- Requires interpretation
- Multiple steps implied
- Example: "Two quantities are proportional. When one is 4, the other is 20..."

### Hard
- Highly ambiguous
- No concept names
- Requires reasoning
- Complex parameters
- Example: "Something squared minus 5 times itself plus 6 equals zero..."

## Adding New Tests

1. Open `tests/data/advanced-problems.json`
2. Add new problem:

```json
{
  "id": 26,
  "difficulty": "medium",
  "question": "Ambiguous question without explicit concept",
  "expectedTool": "toolName",
  "expectedAnswer": { "result": 42 },
  "tolerance": 0.01
}
```

### Answer Format Examples

**Single value:**
```json
"expectedAnswer": { "y": 22 }
```

**Multiple values:**
```json
"expectedAnswer": { "nthTerm": 32, "sum": 185 }
```

**Array:**
```json
"expectedAnswer": { "roots": [3, 2] }
```

**Nested object:**
```json
"expectedAnswer": {
  "assets": 800000,
  "liabilities": 300000,
  "capital": 500000
}
```

## When to Use

✅ **Use Advanced Test when:**
- Full validation required
- Testing answer accuracy
- Validating computation logic
- Testing AI reasoning ability
- Quality assurance before deployment
- Benchmarking AI performance

❌ **Don't use Advanced Test when:**
- Only need quick tool selection check
- Testing new tool descriptions
- Running frequent CI/CD checks (use simple test)

## Performance

- **Speed**: ~2 seconds per test
- **Rate Limit**: 2-second delay between tests
- **Full Suite**: ~50 seconds for 25 tests
- **Retry Logic**: Up to 2 retries per test

## Understanding Scores

### 100% (Perfect)
```
✅ Tool: calculateLinearY (+50)
✅ Answer: Correct (+50)
Score: 100/100
```
AI selected correct tool AND computed correct answer.

### 50% (Partial)
```
✅ Tool: calculateLinearY (+50)
❌ Answer: Wrong (0)
Score: 50/100
```
AI selected correct tool BUT answer was incorrect.
- Check tolerance value
- Verify expected answer format
- Review computation logic

### 0% (Failed)
```
❌ Tool: solveQuadratic (expected calculateLinearY)
Score: 0/100
```
AI selected wrong tool.
- Question may be ambiguous
- Tool descriptions may need clarification
- Add more context to question

## Troubleshooting

### Low Average Score (<80%)

**Check:**
1. Question clarity
2. Expected answer format
3. Tolerance values
4. Tool descriptions

### Partial Scores (50%)

**Causes:**
- Tolerance too strict
- Expected answer format mismatch
- Rounding differences
- Missing fields in expected answer

**Solutions:**
- Increase tolerance
- Match exact output format
- Check for extra fields in result

### Random Failures

**Causes:**
- AI temperature too high (already set to 0.1)
- Ambiguous questions
- Edge cases

**Solutions:**
- Make questions more explicit
- Add retry logic (already included)
- Review failed test questions

## Best Practices

### Writing Good Test Questions

1. **Be Ambiguous (Intentionally)**
   ```
   Good: "Something squared minus 5 times itself..."
   Bad: "Solve the quadratic equation..."
   ```

2. **Include All Parameters**
   ```
   Good: "When one is 4, the other is 20. If first becomes 7..."
   Bad: "Find the proportional value..."
   ```

3. **Use Natural Language**
   ```
   Good: "A round shape has distance 7 from center to edge"
   Bad: "Calculate circle properties for r=7"
   ```

4. **Test Edge Cases**
   - Large numbers
   - Decimals
   - Negative values
   - Zero values

### Setting Tolerance

- **Integers**: `0.01`
- **Decimals (2 places)**: `0.01`
- **Decimals (3+ places)**: `0.1`
- **Large numbers**: `1` or `10`
- **Percentages**: `0.1`

## Command Reference

| Command | Description |
|---------|-------------|
| `npm run test:advanced` | All 25 tests |
| `npm run test:advanced:quick` | 5 tests |
| `npm run test:advanced:random` | 10 random tests |
| `npm run test:advanced:easy` | Easy difficulty only |
| `npm run test:advanced:medium` | Medium difficulty only |
| `npm run test:advanced:hard` | Hard difficulty only |
| `node tests/advanced-test.js --limit=N` | Custom count |
| `node tests/advanced-test.js --random --limit=N` | Random N tests |
| `node tests/advanced-test.js --difficulty=X --limit=N` | Filtered tests |

## Example Test Cases

### Easy Test
```json
{
  "difficulty": "easy",
  "question": "A sequence starts at 5 and increases by 3 each time. What's the 10th number?",
  "expectedTool": "solveArithmeticProgression",
  "expectedAnswer": { "nthTerm": 32, "sum": 185 },
  "tolerance": 0.01
}
```

### Medium Test
```json
{
  "difficulty": "medium",
  "question": "Two values have an inverse relationship. At 5 and 12, they balance. If one drops to 3, what happens to the other?",
  "expectedTool": "calculateInverseVariation",
  "expectedAnswer": { "k": 60, "y2": 20 },
  "tolerance": 0.01
}
```

### Hard Test
```json
{
  "difficulty": "hard",
  "question": "2 times something squared plus 7 times that thing minus 15 is zero. What are the values?",
  "expectedTool": "solveQuadraticRoots",
  "expectedAnswer": { "roots": [1.5, -5] },
  "tolerance": 0.01
}
```

## Next Steps

After running advanced tests:
1. Review average score
2. Investigate partial scores
3. Improve ambiguous questions
4. Add more edge cases
5. Test in production environment
