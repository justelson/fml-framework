# MathF3 AI Testing Suite

Complete testing system for validating AI tool selection and answer accuracy.

## 📁 Structure

```
tests/
├── data/                      # Test data
│   ├── tool-definitions.json  # AI tool schemas
│   ├── test-problems.json     # Simple test problems
│   └── advanced-problems.json # Advanced test problems
├── results/                   # Test results (auto-generated)
│   ├── simple-results.json
│   └── advanced-results.json
├── simple-test.js            # Tool selection test
├── advanced-test.js          # Full validation test
├── README.md                 # This file
├── SIMPLE-TEST.md           # Simple test docs
└── ADVANCED-TEST.md         # Advanced test docs
```

## 🚀 Quick Start

### 1. Setup
```bash
# Ensure .env file has your Groq API key
GROQ_API_KEY=your_key_here
```

### 2. Run Tests

**Simple Test** (Tool selection only):
```bash
npm run test:simple          # All tests
npm run test:simple:quick    # 5 tests
```

**Advanced Test** (Tool + Answer validation):
```bash
npm run test:advanced        # All tests
npm run test:advanced:quick  # 5 tests
npm run test:advanced:random # 10 random tests
```

## 📊 Test Types

### Simple Test
- **Purpose**: Verify AI selects correct tools
- **Scoring**: Pass/Fail (100% or 0%)
- **Speed**: Fast (~2 sec per test)
- **Use Case**: Quick validation, CI/CD

### Advanced Test
- **Purpose**: Verify tool selection AND answer accuracy
- **Scoring**: 50% tool + 50% answer = 100%
- **Speed**: Moderate (~2 sec per test)
- **Use Case**: Full validation, quality assurance

## 📈 Understanding Results

### Simple Test Output
```
[1/5] Linear Functions
Q: Find y when x = 5 in y = 3x + 7
Tool: calculateLinearY ✅

RESULTS: 5/5 passed (100%)
```

### Advanced Test Output
```
[1/5] EASY
Q: If I plug 5 into y = 3x + 7, what do I get?
✅ Tool: calculateLinearY (+50)
✅ Answer: Correct (+50)
Score: 100/100

⭐ AVERAGE SCORE: 100.0/100
```

## 🎯 Test Coverage

- **20 Tools**: All math functions covered
- **25 Problems**: Various difficulty levels
- **3 Difficulties**: Easy, Medium, Hard
- **8 Categories**: Algebra, Statistics, Geometry, etc.

## 📝 Adding New Tests

### Simple Test
Edit `data/test-problems.json`:
```json
{
  "id": 26,
  "category": "New Category",
  "question": "Your question here",
  "expectedTool": "toolName"
}
```

### Advanced Test
Edit `data/advanced-problems.json`:
```json
{
  "id": 26,
  "difficulty": "medium",
  "question": "Ambiguous question without concept name",
  "expectedTool": "toolName",
  "expectedAnswer": { "result": 42 },
  "tolerance": 0.01
}
```

## 🔧 Command Reference

| Command | Description |
|---------|-------------|
| `npm run test:simple` | Run all simple tests |
| `npm run test:simple:quick` | Run 5 simple tests |
| `npm run test:advanced` | Run all advanced tests |
| `npm run test:advanced:quick` | Run 5 advanced tests |
| `npm run test:advanced:random` | Run 10 random tests |
| `npm run test:advanced:easy` | Run only easy tests |
| `npm run test:advanced:medium` | Run only medium tests |
| `npm run test:advanced:hard` | Run only hard tests |

## 💡 Tips

1. **Start with Simple**: Run simple tests first to verify tool selection
2. **Use Random**: Test with `--random` to avoid order bias
3. **Check Results**: Review JSON files in `results/` for details
4. **Rate Limits**: Tests include 2-second delays for Groq free tier
5. **Retry Logic**: Advanced test retries failed attempts automatically

## 🐛 Troubleshooting

**"API key required"**
- Set `GROQ_API_KEY` in `.env` file

**Rate limit errors**
- Tests already include delays
- Reduce test count with `--limit=5`

**Wrong answers**
- Check `tolerance` in problem definition
- Verify expected answer format matches tool output

## 📚 More Info

- [Simple Test Documentation](./SIMPLE-TEST.md)
- [Advanced Test Documentation](./ADVANCED-TEST.md)
- [Main Project README](../README.md)
