# Simple Test Documentation

Tests if the AI correctly identifies and selects the appropriate tool for each math problem.

## Purpose

Validates that the AI can:
- Understand natural language math problems
- Identify the correct mathematical concept
- Select the appropriate tool from 20 available options

## Scoring

- **Pass**: Correct tool selected (100%)
- **Fail**: Wrong tool or no tool (0%)

## Usage

### Basic Commands

```bash
# Run all tests (25 problems)
npm run test:simple

# Run limited tests
npm run test:simple:quick              # 5 tests
node tests/simple-test.js --limit=10   # 10 tests
```

### Custom Runs

```bash
# Specific number of tests
node tests/simple-test.js --limit=15
```

## Output Format

```
============================================================
SIMPLE TEST - Tool Selection
============================================================
Running 5 tests...

[1/5] Linear Functions
Q: Find the value of y when x = 5 in the equation y = 3x + 7
Tool: calculateLinearY ✅

[2/5] Quadratic Equations
Q: Find the roots of the quadratic equation x^2 - 5x + 6 = 0
Tool: solveQuadraticRoots ✅

[3/5] Quadratic Equations
Q: Find the turning point of the parabola y = 2x^2 - 8x + 5
Tool: findQuadraticVertex ✅

[4/5] Statistics
Q: Calculate the mean, median, and mode of the dataset: 5, 8, 12, 15, 12, 8, 20
Tool: analyzeDataList ✅

[5/5] Statistics - Grouped Data
Q: Calculate the mean for grouped data with class marks [15, 25, 35, 45] and frequencies [3, 7, 5, 2]
Tool: calculateGroupedMean ✅

============================================================
RESULTS: 5/5 passed (100%)
============================================================
```

## Results File

Results are saved to `tests/results/simple-results.json`:

```json
{
  "results": [
    {
      "id": 1,
      "success": true,
      "tool": "calculateLinearY"
    },
    {
      "id": 2,
      "success": true,
      "tool": "solveQuadraticRoots"
    }
  ],
  "summary": {
    "passed": 5,
    "total": 5,
    "rate": "100.0"
  }
}
```

## Test Data

Located in `tests/data/test-problems.json`:

```json
{
  "problems": [
    {
      "id": 1,
      "category": "Linear Functions",
      "question": "Find the value of y when x = 5 in the equation y = 3x + 7",
      "expectedTool": "calculateLinearY"
    }
  ]
}
```

## Adding New Tests

1. Open `tests/data/test-problems.json`
2. Add new problem:

```json
{
  "id": 26,
  "category": "Your Category",
  "question": "Your clear question with all parameters",
  "expectedTool": "exactToolName"
}
```

3. Run test to verify

## When to Use

✅ **Use Simple Test when:**
- Quick validation needed
- Testing tool selection logic
- Running in CI/CD pipeline
- Debugging tool descriptions
- Verifying AI understands problem types

❌ **Don't use Simple Test when:**
- Need to verify answer accuracy
- Testing computation logic
- Validating edge cases in calculations

## Performance

- **Speed**: ~2 seconds per test
- **Rate Limit**: 2-second delay between tests (Groq free tier)
- **Full Suite**: ~50 seconds for 25 tests

## Troubleshooting

### All tests failing
- Check API key in `.env`
- Verify tool definitions in `data/tool-definitions.json`

### Specific test failing
- Review question clarity
- Check if tool name matches exactly
- Verify all parameters are in question

### Inconsistent results
- AI may interpret ambiguous questions differently
- Make questions more explicit
- Add specific numbers and units

## Tips

1. **Clear Questions**: Include all necessary parameters
2. **Explicit Concepts**: Mention key terms (e.g., "quadratic", "mean")
3. **Complete Info**: Don't leave values ambiguous
4. **Test Incrementally**: Add one test at a time
5. **Review Failures**: Check if question is unclear

## Example Test Cases

### Good Question
```json
{
  "question": "Find the roots of the quadratic equation x^2 - 5x + 6 = 0",
  "expectedTool": "solveQuadraticRoots"
}
```
✅ Clear concept, all parameters present

### Bad Question
```json
{
  "question": "Solve this equation",
  "expectedTool": "solveQuadraticRoots"
}
```
❌ No equation given, concept unclear

## Next Steps

After passing simple tests:
- Run [Advanced Tests](./ADVANCED-TEST.md) for full validation
- Check answer accuracy
- Test with ambiguous questions
