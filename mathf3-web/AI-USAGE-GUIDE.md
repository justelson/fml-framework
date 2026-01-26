# AI Assistant Usage Guide

How to use the AI Math Assistant effectively.

## 🚀 Quick Start

1. **Set API Key**
   - Go to Settings tab
   - Enter your Groq API key
   - Get free key: https://console.groq.com/keys

2. **Navigate to AI Assist**
   - Click "AI Assist" in the navigation

3. **Ask Questions**
   - Type your math question
   - Press Enter or click "Ask AI"
   - Get instant answers!

## 💬 Chat Interface

### Features

**Message Types:**
- 👤 **Your Questions** - Blue background
- 🤖 **AI Answers** - Gray background with tool info
- ❌ **Errors** - Red background

**Controls:**
- **Ask AI** - Submit your question
- **Clear Chat** - Reset conversation
- **Example Questions** - Quick templates

### Keyboard Shortcuts
- `Enter` - Send message
- `Shift + Enter` - New line in question

## 📝 How to Ask Questions

### Good Questions

✅ **Include all numbers:**
```
Find the roots of x² - 5x + 6 = 0
```

✅ **Be specific:**
```
Calculate the mean of: 5, 8, 12, 15, 12, 8, 20
```

✅ **State what you want:**
```
If y varies directly as x, and y = 20 when x = 4, find y when x = 7
```

### Bad Questions

❌ **Too vague:**
```
Solve this equation
```

❌ **Missing numbers:**
```
Find the area of a circle
```

❌ **Unclear goal:**
```
What about quadratics?
```

## 🎯 Example Questions by Topic

### Algebra
```
Find the roots of x² - 5x + 6 = 0
Find the turning point of y = 2x² - 8x + 5
Calculate y when x = 5 in y = 3x + 7
```

### Statistics
```
Calculate the mean of: 5, 8, 12, 15, 12, 8, 20
Find the median and mode of: 10, 15, 20, 15, 25, 30
Calculate grouped mean with class marks [15, 25, 35, 45] and frequencies [3, 7, 5, 2]
```

### Variations
```
If y varies directly as x, and y = 20 when x = 4, find y when x = 7
If y varies inversely as x, and y = 12 when x = 5, find y when x = 3
```

### Sequences
```
Find the 10th term of an AP with first term 5 and common difference 3
Find the 6th term of a GP with first term 2 and common ratio 3
Calculate compound interest on $5000 at 6% for 3 years
```

### Circles
```
Find the area of a circle with radius 7
Calculate arc length and sector area for radius 10 and angle 60 degrees
Find chord length in circle with radius 13 if distance from center is 5
```

### Earth Geometry
```
Calculate distance between latitude 10°N and 40°N
Find distance at 30°N latitude from 20°E to 50°E
Calculate distance between points (-6.7, 39.2) and (-6.1, 35.7)
```

### Accounting
```
If assets are 500000 and liabilities are 150000, find capital
A business has liabilities 75000 and capital 125000, find assets
Generate balance sheet for assets 800000 and liabilities 300000
```

## 🔧 Understanding Responses

### Successful Response
```
🤖 AI Assistant
🔧 Used tool: solveQuadraticRoots
Roots: x = 3 or x = 2
```

**Parts:**
- Tool name shows which function was used
- Result shows the computed answer

### Error Response
```
❌ Error
Missing API Key. Please set your Groq API key in Settings.
```

**Common Errors:**
- No API key set
- Rate limit exceeded
- Invalid question format
- Network issues

## 💡 Tips for Best Results

### 1. Be Explicit
Instead of: "Find the answer"
Use: "Find the roots of x² - 5x + 6 = 0"

### 2. Include Units
Instead of: "Calculate interest on 5000"
Use: "Calculate compound interest on $5000 at 6% for 3 years"

### 3. Specify What to Find
Instead of: "Arithmetic progression 5, 8, 11"
Use: "Find the 10th term of AP with first term 5 and common difference 3"

### 4. Use Clear Numbers
Instead of: "A few numbers"
Use: "5, 8, 12, 15, 12, 8, 20"

### 5. One Question at a Time
Instead of: "Find roots and vertex"
Use: "Find the roots of x² - 5x + 6 = 0" (then ask about vertex)

## 🎨 Interface Tips

### Chat History
- Scroll to see previous messages
- Clear chat to start fresh
- Messages persist during session

### Example Questions
- Click any example to use it
- Modify examples for your needs
- Learn question patterns

### Loading State
- "🤔 Thinking..." shows AI is working
- Usually takes 1-3 seconds
- Don't submit multiple times

## 🐛 Troubleshooting

### "Please set your Groq API key"
**Solution:** Go to Settings and enter your API key

### "Rate limit exceeded"
**Solution:** Wait 1 minute, then try again (free tier limit)

### "No tool call made"
**Solution:** Rephrase question more clearly with all numbers

### Wrong Answer
**Solution:** 
1. Check if question was clear
2. Verify all numbers are correct
3. Try rephrasing the question

### Slow Response
**Solution:**
1. Check internet connection
2. Groq service may be busy
3. Try again in a moment

## 📊 Supported Operations

### 20 Math Tools Available

1. **calculateLinearY** - Linear equations
2. **solveQuadraticRoots** - Quadratic roots
3. **findQuadraticVertex** - Turning points
4. **analyzeDataList** - Statistics (raw data)
5. **calculateGroupedMean** - Grouped mean
6. **calculateGroupedMedian** - Grouped median
7. **calculateGroupedMode** - Grouped mode
8. **calculateDirectVariation** - Direct variation
9. **calculateInverseVariation** - Inverse variation
10. **solveArithmeticProgression** - AP calculations
11. **solveGeometricProgression** - GP calculations
12. **calculateCompoundInterest** - Interest calculations
13. **calculateCircleProperties** - Circle area/circumference
14. **calculateArcSector** - Arc and sector
15. **calculateChordLength** - Chord calculations
16. **calculateGreatCircle** - Meridian distance
17. **calculateSmallCircle** - Parallel distance
18. **calculateHaversine** - Any two points on Earth
19. **solveAccountingEquation** - Accounting equation
20. **generateBalanceSheet** - Balance sheet

## 🎓 Learning Tips

### Start Simple
Begin with basic questions to understand the interface

### Use Examples
Click example questions to see proper format

### Experiment
Try different ways of asking the same question

### Check Results
Verify answers make sense for your problem

### Build Complexity
Start simple, then try more complex problems

## 🔐 Privacy & Security

- API key stored locally in browser
- Questions sent to Groq AI service
- No data stored on our servers
- Clear chat to remove history

## 📚 Additional Resources

- [Main README](./README.md) - App overview
- [Testing Guide](./TESTING.md) - Test the AI
- [Test Documentation](./tests/README.md) - Detailed tests

## 🎉 Have Fun Learning!

The AI assistant is here to help you understand Form 3 mathematics. Don't hesitate to ask questions and experiment!
