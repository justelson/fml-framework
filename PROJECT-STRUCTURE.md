# Project Structure

Clean, organized codebase for MathF3 learning platform.

## 📁 Directory Tree

```
touching_grass/
│
├── 📂 fml-framework/                 # SHARED - Core formula library
│   ├── formulas/                    # Python implementations (source of truth)
│   ├── templates/                   # Project templates
│   ├── AGENT_GUIDE.md               # Master AI instructions
│   └── QUICK_START.md               # Guide for AI agents
│
├── 📱 mathf3-o/                      # Form 3 Math (Old Syllabus)
│   ├── src/
│   │   ├── chapters/                # 8 math chapters (React components)
│   │   ├── components/              # Reusable UI components
│   │   └── lib/                     # Core logic & AI integration
│   ├── tests/                       # AI testing suite
│   ├── package.json                 # Dependencies & scripts
│   └── README.md                    # Web app documentation
│
├── 🐍 python-scripts/               # Original Python implementations
│   ├── gui_app.py                  # GUI application
│   └── README.md                   # Python scripts info
│
├── 📚 textbook/                     # Reference materials
│
└── 🔧 Configuration Files
    ├── .agent/                     # AI Agent Workflows
    ├── .gitignore                  # Git ignore rules
    ├── requirements.txt            # Python dependencies
    ├── README.md                   # Main project README
    └── PROJECT-STRUCTURE.md        # This file
│
└── 🗑️ Legacy (empty, can be deleted)
    ├── math-play/                  # (Python files moved)
    ├── mathf3/                     # (Python files moved)
    ├── __pycache__/                # (Python cache)
    └── .venv/                      # (Python virtual env)
```

## 📊 File Count Summary

### Active Project (mathf3-o/)
- **React Components**: 11 files
- **JavaScript Modules**: 7 files
- **Test Files**: 2 runners + 3 data files
- **Documentation**: 5 markdown files
- **Configuration**: 4 files

### Python Scripts
- **Scripts**: 6 files
- **Documentation**: 1 file

### Documentation
- **Root**: 3 markdown files
- **Web App**: 2 markdown files
- **Tests**: 3 markdown files

## 🎯 Key Directories

### `/mathf3-o/src/`
**Purpose**: Main application source code

**Contents**:
- `chapters/` - 8 math chapter components
- `components/` - Reusable UI components
- `lib/` - Math functions & AI integration
- `App.jsx` - Main app component
- `main.jsx` - Entry point
- `styles.css` - Global styles

### `/mathf3-o/tests/`
**Purpose**: AI testing and validation

**Contents**:
- `data/` - Test problems & tool schemas
- `results/` - Test output (auto-generated)
- `simple-test.js` - Tool selection test
- `advanced-test.js` - Full validation test
- Documentation files

### `/python-scripts/`
**Purpose**: Original Python implementations

**Contents**:
- GUI applications
- Command-line tools
- AI integrations
- README documentation

### `/textbook/`
**Purpose**: Reference materials

**Contents**:
- Form 3 mathematics PDF textbook

## 🧹 Cleanup Summary

### Moved
✅ Python files → `python-scripts/`
- From `math-play/` (2 files)
- From `mathf3/` (4 files)

### Deleted
✅ Old test files from `mathf3-o/` root:
- `test-ai-tools.js`
- `advanced-test-runner.js`
- `test-problems.json`
- `advanced-test-problems.json`
- `test-results.json`
- `advanced-test-results.json`
- `TEST_README.md`

### Organized
✅ Test system → `mathf3-o/tests/`
- Unified structure
- Clear documentation
- Proper data separation

## 📝 Documentation Hierarchy

```
README.md (Root)
├── Quick start
├── Project overview
└── Links to detailed docs
    │
    ├── mathf3-o/README.md
    │   ├── Web app details
    │   ├── Features
    │   └── Development guide
    │
    ├── mathf3-o/TESTING.md
    │   ├── Testing overview
    │   ├── Quick commands
    │   └── Links to test docs
    │       │
    │       ├── tests/README.md
    │       │   └── Test system details
    │       │
    │       ├── tests/SIMPLE-TEST.md
    │       │   └── Simple test guide
    │       │
    │       └── tests/ADVANCED-TEST.md
    │           └── Advanced test guide
    │
    └── python-scripts/README.md
        └── Python scripts info
```

## 🚀 Getting Started

### For Users
1. Read `README.md` (root)
2. Navigate to `mathf3-o/`
3. Follow `mathf3-o/README.md`

### For Developers
1. Read `README.md` (root)
2. Read `mathf3-o/README.md`
3. Read `mathf3-o/TESTING.md`
4. Explore `tests/` documentation

### For Testers
1. Read `mathf3-o/TESTING.md`
2. Read `tests/README.md`
3. Choose test type:
   - Simple: `tests/SIMPLE-TEST.md`
   - Advanced: `tests/ADVANCED-TEST.md`

## 🎨 Code Organization Principles

### Separation of Concerns
- **UI**: React components in `src/chapters/` and `src/components/`
- **Logic**: Pure functions in `src/lib/`
- **Tests**: Isolated in `tests/` directory
- **Config**: Root-level configuration files

### Single Responsibility
- Each file has one clear purpose
- Components focus on UI
- Libraries focus on logic
- Tests focus on validation

### Clear Naming
- Descriptive file names
- Consistent conventions
- Obvious directory purposes

### Documentation
- README at each level
- Inline code comments
- Comprehensive guides
- Clear examples

## 🔍 Finding Things

### "Where is the math logic?"
→ `mathf3-o/src/lib/math.js`

### "Where are the AI tools?"
→ `mathf3-o/src/lib/aiTools.js`

### "Where are the tests?"
→ `mathf3-o/tests/`

### "Where is the UI?"
→ `mathf3-o/src/chapters/` and `mathf3-o/src/components/`

### "Where are the Python scripts?"
→ `python-scripts/`

### "Where is the textbook?"
→ `textbook/`

### "Where is the documentation?"
→ Multiple `README.md` files at each level

## 📦 Dependencies

### Web Application
- React ecosystem
- Groq AI SDK
- Chart.js
- KaTeX
- Vite

### Python Scripts
- See `requirements.txt`

## 🎯 Next Steps

### To Run the App
```bash
cd mathf3-o
npm install
npm run dev
```

### To Run Tests
```bash
cd mathf3-o
npm run test:advanced:quick
```

### To Clean Up Further
Optional deletions (if not needed):
- `math-play/` (empty)
- `mathf3/` (empty)
- `__pycache__/` (Python cache)
- `.venv/` (Python virtual env)
- `.ai-powers/` (if not using)

## ✅ Clean Codebase Checklist

- [x] Python scripts organized
- [x] Old test files removed
- [x] Test system unified
- [x] Documentation complete
- [x] Structure clear
- [x] .gitignore added
- [x] READMEs at all levels
- [x] Proper separation of concerns
- [x] Consistent naming
- [x] No duplicate files

## 🎉 Result

**Clean, professional, production-ready codebase!**
