# MathF3 - Form 3 Mathematics Learning Platform

Interactive web application for learning Form 3 mathematics with AI-powered assistance.

## 📚 Project Structure

```
touching_grass/
├── mathf3-web/              # Main web application (React + Vite)
│   ├── src/                 # Source code
│   │   ├── chapters/        # 8 math chapters
│   │   ├── components/      # Reusable components
│   │   └── lib/             # Math functions & AI tools
│   ├── tests/               # AI testing suite
│   │   ├── data/            # Test problems & tool definitions
│   │   ├── results/         # Test results (auto-generated)
│   │   └── *.js             # Test runners
│   └── public/              # Static assets
├── python-scripts/          # Original Python implementations
├── textbook/                # PDF textbook reference
└── requirements.txt         # Python dependencies
```

## 🚀 Quick Start

### Web Application

```bash
cd mathf3-web
npm install
npm run dev
```

Visit: http://localhost:5173

### AI Testing

```bash
cd mathf3-web

# Quick test (5 problems)
npm run test:advanced:quick

# Full test (25 problems)
npm run test:advanced
```

See [mathf3-web/TESTING.md](./mathf3-web/TESTING.md) for details.

## 📖 Features

### 8 Mathematics Chapters

1. **Relations & Functions** - Domain, range, function types
2. **Algebra** - Linear & quadratic equations, graphs
3. **Statistics** - Mean, median, mode (raw & grouped data)
4. **Rates & Variations** - Direct & inverse variation
5. **Sequences & Series** - AP, GP, compound interest
6. **Circles** - Area, circumference, arc, sector, chord
7. **Earth Geometry** - Great circle, small circle, haversine
8. **Accounting** - Balance sheet, accounting equation

### AI Assistant

- **Natural Language Interface** - Ask questions in plain English
- **20 Math Tools** - Specialized calculation functions
- **Automatic Tool Selection** - AI picks the right tool
- **Real-time Answers** - Instant computed results
- **Chat History** - Track your conversation
- **Example Questions** - Quick start templates
- **Groq Integration** - Fast AI responses (Llama 3.3 70B)
- **Answer Validation** - Verified computations

### Interactive Learning

- **Visual Charts** - Plot functions and sequences
- **Step-by-Step** - Detailed solution explanations
- **Practice Problems** - Built-in exercises
- **Dark Mode** - Eye-friendly interface
- **Responsive** - Works on all devices

## 🧪 Testing System

Comprehensive AI validation with two test types:

### Simple Test (Tool Selection)
- Validates AI selects correct tools
- Pass/Fail scoring
- Fast execution (~2 sec/test)

### Advanced Test (Full Validation)
- Validates tool selection + answer accuracy
- 50% tool + 50% answer = 100%
- Handles ambiguous questions
- Random test selection
- Difficulty filtering

**Current Status**: 100% success rate on all tests

See [mathf3-web/TESTING.md](./mathf3-web/TESTING.md) for complete guide.

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Chart.js** - Data visualization
- **KaTeX** - Math rendering

### AI Integration
- **Groq SDK** - AI API client
- **Llama 3.3 70B** - Language model
- **Function Calling** - Tool selection

### Testing
- **Node.js** - Test runner
- **dotenv** - Environment config
- **Custom validators** - Answer checking

## 📝 Documentation

- [Main Testing Guide](./mathf3-web/TESTING.md) - Quick start & overview
- [Test System README](./mathf3-web/tests/README.md) - Detailed test docs
- [Simple Test Guide](./mathf3-web/tests/SIMPLE-TEST.md) - Tool selection testing
- [Advanced Test Guide](./mathf3-web/tests/ADVANCED-TEST.md) - Full validation

## 🔧 Development

### Install Dependencies

```bash
cd mathf3-web
npm install
```

### Environment Setup

Create `mathf3-web/.env`:
```
VITE_GROQ_API_KEY=your_groq_api_key_here
GROQ_API_KEY=your_groq_api_key_here
```

Get free API key: https://console.groq.com/keys

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

### Run Tests

```bash
# Simple test
npm run test:simple:quick

# Advanced test
npm run test:advanced:quick

# Random tests
npm run test:advanced:random

# By difficulty
npm run test:advanced:easy
npm run test:advanced:medium
npm run test:advanced:hard
```

## 📚 Learning Resources

### Textbook
PDF reference located in `textbook/` folder:
- Basic maths F3 Wazaelimu.com.pdf

### Python Scripts
Original implementations in `python-scripts/`:
- GUI applications
- Command-line tools
- AI integrations (Gemini, NBLM, Studio)

## 🎯 Use Cases

### Students
- Learn Form 3 mathematics interactively
- Get AI help with homework
- Practice with instant feedback
- Visualize mathematical concepts

### Teachers
- Demonstrate concepts visually
- Generate practice problems
- Verify student solutions
- Create interactive lessons

### Developers
- Study AI tool integration
- Learn function calling patterns
- Explore math computation
- Test AI reliability

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Run tests: `npm run test:advanced`
5. Submit pull request

## 📄 License

Educational project for Form 3 mathematics learning.

## 🙏 Acknowledgments

- Textbook: Wazaelimu.com
- AI: Groq (Llama 3.3 70B)
- Math rendering: KaTeX
- Charts: Chart.js

## 📞 Support

For issues or questions:
1. Check [TESTING.md](./mathf3-web/TESTING.md)
2. Review test documentation
3. Run diagnostic tests
4. Check console for errors

## 🎉 Status

✅ **Production Ready**
- 20 math tools implemented
- 8 chapters complete
- AI integration working
- 100% test success rate
- Comprehensive documentation
- Clean codebase structure
