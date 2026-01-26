# MathF3 AI Testing Guide

Complete guide for testing the AI tool integration system.

## 🎯 Overview

The testing system validates that the AI correctly:
1. **Understands** natural language math problems
2. **Selects** the appropriate calculation tool
3. **Computes** accurate answers

## 📚 Documentation

- **[tests/README.md](./tests/README.md)** - Main testing documentation
- **[tests/SIMPLE-TEST.md](./tests/SIMPLE-TEST.md)** - Tool selection testing
- **[tests/ADVANCED-TEST.md](./tests/ADVANCED-TEST.md)** - Full validation testing

## 🚀 Quick Start

### 1. Setup Environment

Create `.env` file with your Groq API key:
```bash
GROQ_API_KEY=your_groq_api_key_here
```

Get a free key at: https://console.groq.com/keys

### 2. Run Tests

**Quick validation (5 tests, ~10 seconds):**
```bash
npm run test:simple:quick
```

**Full validation (5 tests, ~10 seconds):**
```bash
npm run test:advanced:quick
```

## 📊 Test Types

### Simple Test
- **What**: Validates tool selection only
- **Scoring**: Pass/Fail (100% or 0%)
- **Speed**: Fast (~2 sec/test)
- **Use**: Quick checks, CI/CD

```bash
npm run test:simple        # All tests
npm run test:simple:quick  # 5 tests
```

### Advanced Test
- **What**: Validates tool selection + answer accuracy
- **Scoring**: 50% tool + 50% answer = 100%
- **Speed**: Moderate (~2 sec/test)
- **Use**: Full validation, QA

```bash
npm run test:advanced         # All tests
npm run test:advanced:quick   # 5 tests
npm run test:advanced:random  # 10 random
npm run test:advanced:easy    # Easy only
npm run test:advanced:medium  # Medium only
npm run test:advanced:hard    # Hard only
```

## 📈 Understanding Results

### Simple Test Output
```
[1/5] Linear Functions
Q: Find y when x = 5 in y = 3x + 7
Tool: calculateLinearY ✅

RESULTS: 5/5 passed (100.0%)
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

## 🎓 Test Coverage

- **20 Tools**: All mathematical functions
- **25 Problems**: Various difficulty levels
- **3 Difficulties**: Easy, Medium, Hard
- **8 Categories**:
  - Linear & Quadratic Equations
  - Statistics (raw & grouped data)
  - Direct & Inverse Variation
  - Arithmetic & Geometric Progressions
  - Compound Interest
  - Circle Geometry
  - Earth Geometry
  - Accounting

## 📁 Project Structure

```
mathf3-web/
├── tests/
│   ├── data/
│   │   ├── tool-definitions.json    # AI tool schemas
│   │   ├── test-problems.json       # Simple test data
│   │   └── advanced-problems.json   # Advanced test data
│   ├── results/
│   │   ├── simple-results.json      # Auto-generated
│   │   └── advanced-results.json    # Auto-generated
│   ├── simple-test.js              # Tool selection test
│   ├── advanced-test.js            # Full validation test
│   ├── README.md                   # Main test docs
│   ├── SIMPLE-TEST.md             # Simple test guide
│   └── ADVANCED-TEST.md           # Advanced test guide
├── .env                            # API keys (create this)
├── .env.example                    # Template
├── package.json                    # Test scripts
└── TESTING.md                      # This file
```

## 🔧 All Commands

| Command | Description |
|---------|-------------|
| `npm run test:simple` | Run all simple tests (25) |
| `npm run test:simple:quick` | Run 5 simple tests |
| `npm run test:advanced` | Run all advanced tests (25) |
| `npm run test:advanced:quick` | Run 5 advanced tests |
| `npm run test:advanced:random` | Run 10 random tests |
| `npm run test:advanced:easy` | Run only easy tests |
| `npm run test:advanced:medium` | Run only medium tests |
| `npm run test:advanced:hard` | Run only hard tests |

## 💡 Best Practices

### When to Use Each Test

**Use Simple Test:**
- ✅ Quick validation during development
- ✅ CI/CD pipeline checks
- ✅ Testing tool descriptions
- ✅ Verifying AI understands concepts

**Use Advanced Test:**
- ✅ Pre-deployment validation
- ✅ Quality assurance
- ✅ Testing computation accuracy
- ✅ Benchmarking AI performance
- ✅ Testing with ambiguous questions

### Development Workflow

1. **Start Development**
   ```bash
   npm run test:simple:quick
   ```

2. **Before Commit**
   ```bash
   npm run test:advanced:quick
   ```

3. **Before Deployment**
   ```bash
   npm run test:advanced
   ```

4. **Random Testing**
   ```bash
   npm run test:advanced:random
   ```

## 🐛 Troubleshooting

### "API key required"
**Solution**: Create `.env` file with `GROQ_API_KEY=your_key`

### Rate limit errors
**Solution**: Tests include 2-second delays. If still failing, reduce test count:
```bash
node tests/advanced-test.js --limit=3
```

### Low scores (<80%)
**Check**:
1. Question clarity in test data
2. Expected answer format
3. Tolerance values
4. Tool descriptions

### Inconsistent results
**Causes**:
- Ambiguous questions (intended for advanced tests)
- AI temperature (already optimized to 0.1)

**Solutions**:
- Review question wording
- Check if parameters are clear
- Verify expected answers

## 📝 Adding New Tests

### Simple Test
Edit `tests/data/test-problems.json`:
```json
{
  "id": 26,
  "category": "New Category",
  "question": "Clear question with all parameters",
  "expectedTool": "toolName"
}
```

### Advanced Test
Edit `tests/data/advanced-problems.json`:
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

## 🎯 Success Criteria

### Development
- Simple test: **≥95%** pass rate
- Advanced test: **≥90%** average score

### Production
- Simple test: **100%** pass rate
- Advanced test: **≥95%** average score

## 📞 Support

For detailed information:
- [Main Test Documentation](./tests/README.md)
- [Simple Test Guide](./tests/SIMPLE-TEST.md)
- [Advanced Test Guide](./tests/ADVANCED-TEST.md)

## 🔄 Continuous Integration

### GitHub Actions Example
```yaml
name: AI Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run test:simple
        env:
          GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}
```

## 📊 Performance

- **Simple Test**: ~50 seconds for 25 tests
- **Advanced Test**: ~50 seconds for 25 tests
- **Rate Limit**: 2-second delay (Groq free tier safe)
- **Retry Logic**: Up to 2 retries per test
- **Success Rate**: 95-100% typical

## 🎉 Current Status

✅ **100% Success Rate** on all test types
✅ **20 Tools** fully validated
✅ **25 Problems** covering all concepts
✅ **Groq Free Tier** compatible
✅ **Production Ready**
