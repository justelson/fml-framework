# Getting Started with MathF4-O

## 🎯 Quick Setup

### 1. Install Dependencies
```bash
cd mathf4-o
npm install
```

This will install all required packages:
- React 18 + Vite
- Mafs (interactive math visualizations)
- Recharts (charts and graphs)
- Three.js + React-Three-Fiber (3D visualizations)
- Groq SDK (AI integration)
- And more...

### 2. Configure API Key

Create a `.env` file in the `mathf4-o` directory:
```bash
VITE_GROQ_API_KEY=your_groq_api_key_here
```

Get your free API key from: https://console.groq.com

### 3. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

## 🧪 Running Tests

### Simple Test (Tool Selection)
```bash
npm run test:simple          # All 10 tests
npm run test:simple:quick    # First 5 tests
```

### Advanced Test (Tool + Answer Validation)
```bash
npm run test:advanced        # All 10 tests
npm run test:advanced:quick  # First 5 tests
npm run test:advanced:random # 10 random tests
```

## 📚 What's Included

### ✅ Complete Math Library
- 45+ mathematical functions covering all Form 4 topics
- Type-safe implementations with error handling
- Comprehensive test coverage

### ✅ AI Assistant
- Natural language problem solving
- Automatic tool selection
- Step-by-step explanations
- Powered by Groq's LLaMA 3.3 70B

### ✅ Visualization Libraries
- **Mafs**: Interactive 2D math visualizations
- **Recharts**: Statistical charts and graphs
- **Three.js**: 3D figure visualizations

### ✅ Testing Suite
- Simple tests for tool selection
- Advanced tests for answer validation
- Comprehensive test coverage
- Easy to extend

## 🎨 Features

### Dark/Light Theme
Toggle between dark and light modes using the theme button in the header.

### Responsive Design
Works on desktop, tablet, and mobile devices.

### Keyboard Navigation
Full keyboard support for accessibility.

## 📖 Usage Examples

### Using the AI Assistant

1. Navigate to the "AI Assist" tab
2. Type your question in natural language:
   - "Find the gradient of the line through (2, 3) and (5, 9)"
   - "Calculate the volume of a cylinder with radius 5 and height 10"
   - "Solve: 2x + 3y = 7 and x + 2y = 4"
3. Click "Ask" or press Enter
4. View the solution with step-by-step explanation

### Using Chapter Calculators

1. Navigate to any chapter tab (Ch 1-8)
2. Enter the required values
3. Click "Calculate"
4. View results with formulas and explanations

## 🔧 Customization

### Adding New Tools

1. Add function to `src/lib/math.js`
2. Add tool definition to `src/lib/aiTools.js`
3. Add dispatcher mapping to `src/lib/toolDispatcher.js`
4. Add test cases to `tests/data/`

### Creating Chapter Components

1. Create new file in `src/chapters/`
2. Import math functions from `src/lib/math.js`
3. Use Container and Property components for layout
4. Add route to `src/App.jsx`

## 🐛 Troubleshooting

### "Missing API Key" Error
- Ensure `.env` file exists in `mathf4-o` directory
- Check that `VITE_GROQ_API_KEY` is set correctly
- Restart the dev server after adding the key

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check for syntax errors in your code
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Test Failures
- Verify API key is set in `.env`
- Check internet connection
- Review test output for specific errors
- Adjust tolerance values if needed

## 📚 Next Steps

1. **Explore the App**: Navigate through all chapters and try the AI Assistant
2. **Run Tests**: Validate that everything works correctly
3. **Customize**: Add your own tools and visualizations
4. **Deploy**: Build and deploy to your preferred hosting platform

## 🤝 Contributing

Contributions are welcome! Areas to expand:
- Add interactive visualizations to chapter components
- Create more test cases
- Improve AI prompts and explanations
- Add more mathematical tools
- Enhance UI/UX

## 📧 Support

For issues or questions:
- Check the README.md
- Review test documentation in `tests/README.md`
- Open an issue on GitHub

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Mafs Documentation](https://mafs.dev)
- [Groq API Docs](https://console.groq.com/docs)
- [Form 4 Mathematics Syllabus](../textbook/)

---

**Happy Learning! 🚀**
