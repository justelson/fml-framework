# MathF4-O Testing Suite

Complete testing system for validating AI tool selection and answer accuracy for Form 4 Mathematics.

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
└── README.md                 # This file
```

## 🚀 Quick Start

### 1. Setup
Ensure `.env` file has your Groq API key:
```bash
VITE_GROQ_API_KEY=your_key_here
```

### 2. Run Tests

**Simple Test** (Tool selection only):
```bash
npm run test:simple          # All 10 tests
npm run test:simple:quick    # First 5 tests
```

**Advanced Test** (Tool + Answer validation):
```bash
npm run test:advanced        # All 10 tests
npm run test:advanced:quick  # First 5 tests
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
[1/10] Coordinate Geometry
Q: Find the gradient of the line through (2, 3) and (5, 9)
Tool: calculateGradient ✅

RESULTS: 10/10 passed (100%)
```

### Advanced Test Output
```
[1/10] EASY
Q: What's the gradient of a line through (2, 3) and (5, 9)?
✅ Tool: calculateGradient (+50)
✅ Answer: Correct (+50)
Score: 100/100

⭐ AVERAGE SCORE: 100.0/100
✅ PASSED: 10/10
```

## 🎯 Test Coverage

### Chapters Covered
1. **Coordinate Geometry** - Gradients, distance
2. **Areas & Perimeters** - Triangle area (SAS)
3. **3D Figures** - Cylinder volume
4. **Probability** - Event probability
5. **Trigonometry** - Sine rule
6. **Vectors** - Vector addition
7. **Matrices** - Determinants, simultaneous equations
8. **Linear Programming** - Objective functions

### Difficulty Levels
- **Easy**: Straightforward problems with clear inputs
- **Medium**: Problems requiring interpretation
- **Hard**: Complex multi-step problems (coming soon)

## 📝 Adding New Tests

### Simple Test
Edit `data/test-problems.json`:
```json
{
  "id": 11,
  "category": "Vectors",
  "question": "Find the magnitude of vector (3, 4)",
  "expectedTool": "vectorMagnitude"
}
```

### Advanced Test
Edit `data/advanced-problems.json`:
```json
{
  "id": 11,
  "difficulty": "easy",
  "question": "What's the magnitude of vector (3, 4)?",
  "expectedTool": "vectorMagnitude",
  "expectedAnswer": { "magnitude": 5 },
  "tolerance": 0.01
}
```

## 🔧 Command Reference

| Command | Description |
|---------|-------------|
| `npm run test:simple` | Run all simple tests (10) |
| `npm run test:simple:quick` | Run 5 simple tests |
| `npm run test:advanced` | Run all advanced tests (10) |
| `npm run test:advanced:quick` | Run 5 advanced tests |
| `npm run test:advanced:random` | Run 10 random tests |

## 💡 Tips

1. **Start with Simple**: Run simple tests first to verify tool selection
2. **Use Random**: Test with `--random` to avoid order bias
3. **Check Results**: Review JSON files in `results/` for details
4. **Rate Limits**: Tests include 2-second delays for Groq free tier
5. **Tolerance**: Adjust `tolerance` in problem definitions for floating-point comparisons

## 🐛 Troubleshooting

**"API key required"**
- Set `VITE_GROQ_API_KEY` in `.env` file

**Rate limit errors**
- Tests already include delays
- Reduce test count with `--limit=5`

**Wrong answers**
- Check `tolerance` in problem definition
- Verify expected answer format matches tool output
- Review calculation in `src/lib/math.js`

**Tool not found**
- Ensure tool is defined in `src/lib/aiTools.js`
- Check tool name matches in `toolDispatcher.js`
- Verify tool is in `data/tool-definitions.json`

## 📚 More Info

- [Main Project README](../README.md)
- [Groq API Documentation](https://console.groq.com/docs)
- [Form 4 Syllabus Coverage](../README.md#-chapter-coverage)

## 🎓 Test Results Interpretation

### Simple Test
- **100%**: All tools correctly selected ✅
- **80-99%**: Minor tool selection issues
- **<80%**: Review AI prompts and tool descriptions

### Advanced Test
- **90-100**: Excellent - Production ready ✅
- **70-89**: Good - Minor accuracy issues
- **50-69**: Fair - Review calculations
- **<50**: Poor - Major issues need fixing

## 🚀 Continuous Integration

Add to your CI/CD pipeline:
```yaml
- name: Run Math Tests
  run: |
    npm run test:simple
    npm run test:advanced:quick
```

## 📊 Performance Benchmarks

- **Simple Test**: ~20 seconds for 10 tests
- **Advanced Test**: ~25 seconds for 10 tests
- **Rate Limit**: 2 seconds between requests
- **Success Rate Target**: >95%

## 🔄 Future Enhancements

- [ ] Add hard difficulty problems
- [ ] Implement parallel test execution
- [ ] Add visualization test cases
- [ ] Create performance benchmarks
- [ ] Add regression test suite
- [ ] Implement test coverage reports
