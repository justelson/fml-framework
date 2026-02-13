# fml4 -o - Form 4 Basic Mathematics (Old Syllabus)

Interactive learning platform for Form 4 Mathematics with AI-powered assistance and comprehensive visualizations.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file with your Groq API key
echo "VITE_GROQ_API_KEY=your_key_here" > .env

# Start development server
npm run dev
```

Visit: http://localhost:5173

## 📖 Documentation

For detailed technical and user guides, see the [Documentation Index](./docs/README.md).

## 📁 Project Structure

```
mathf4-o/
├── src/
│   ├── chapters/           # 8 math chapters + Home + AIAssist + Settings
│   │   ├── Chapter1.jsx    # Coordinate Geometry
│   │   ├── Chapter2.jsx    # Areas & Perimeters
│   │   ├── Chapter3.jsx    # 3D Figures
│   │   ├── Chapter4.jsx    # Probability
│   │   ├── Chapter5.jsx    # Trigonometry
│   │   ├── Chapter6.jsx    # Vectors
│   │   ├── Chapter7.jsx    # Matrices
│   │   ├── Chapter8.jsx    # Linear Programming
│   │   ├── AIAssist.jsx    # AI Assistant
│   │   └── Settings.jsx    # Documentation & API Config
│   ├── components/         # Reusable UI components
│   │   ├── Container.jsx   # Section wrapper
│   │   ├── Reveal.jsx      # Animation wrapper
│   │   └── ThemeToggle.jsx # Theme switcher
│   ├── lib/                # Core functionality
│   │   ├── math.js         # 45+ math functions
│   │   ├── aiTools.js      # AI tool definitions (JSON Schema)
│   │   ├── aiAssist.js     # AI Logic & tool dispatcher
│   │   └── groqService.js  # Groq API integration
│   ├── data/               # Documentation JSONs
│   │   ├── userDocs.json
│   │   └── developerDocs.json
│   ├── App.jsx             # Main application shell
│   └── index.css           # Global design system
├── tests/                  # Automated test suite
│   ├── simple-test.js      # Tool selection tests
│   └── advanced-test.js    # Logic & answer validation
├── .env.example            # Environment template
├── package.json            # Scripts & dependencies
└── vite.config.js          # Vite configuration
```

## 🎯 Features

### 8 Mathematics Chapters
1. **Coordinate Geometry**: Gradients, distance, midpoint, midpoint, line equations.
2. **Areas & Perimeters**: Triangles, quadrilaterals, polygons, circles, similar shapes.
3. **3D Figures**: Cylinders, cones, spheres, pyramids, prisms.
4. **Probability**: Combined events, mutually exclusive, independent.
5. **Trigonometry**: Sine and Cosine rules, 3D TRIG.
6. **Vectors**: Magnitude, direction, addition/subtraction.
7. **Matrices**: Determinants, inverse, transformations.
8. **Linear Programming**: Inequalities and optimization.

### AI Assistant
- Natural language problem solving.
- 45+ specialized math tools.
- Step-by-step explanations (Steps) and simplified analogies (Lazyplain).
- Automatic tool selection using Groq Llama 3.3.

### Interactive Visualizations
- **Mafs**: Geometry and vectors.
- **Three.js**: 3D figure manipulation.
- **Recharts**: Data and optimization regions.

## 🧪 Testing

### Simple Tests (Tool Selection)
```bash
npm run test:simple quick
```

### Advanced Tests (Answer Validation)
```bash
npm run test:advanced quick
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### Settings Page
Manage your API key and view full documentation directly in the app via the **Settings** tab.

## 🐛 Troubleshooting

### AI Not Responding
- Check if your API key is correctly set in Settings.
- Ensure you have an active internet connection.
- Verify Groq API limits.

### Visualizations Frozen
- Refresh the page to reset the Mafs/Three.js canvases.

## 📄 License

Educational project for Form 4 mathematics. Built with the FML Framework.
