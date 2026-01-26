# Cleanup Guide

Instructions for removing legacy folders and keeping the codebase clean.

## ✅ Already Cleaned

- ✅ Python scripts moved to `python-scripts/`
- ✅ Old test files removed from `mathf3-web/`
- ✅ Test system unified in `mathf3-web/tests/`
- ✅ Documentation organized
- ✅ `.gitignore` updated

## 🗑️ Optional Deletions

These folders can be safely deleted if not needed:

### Empty Python Folders
```bash
# From project root
rmdir /s /q math-play
rmdir /s /q mathf3
rmdir /s /q __pycache__
```

### Python Virtual Environment
```bash
# Only if you don't need Python scripts
rmdir /s /q .venv
```

### AI Powers (if not using)
```bash
# Already in .gitignore, but can delete if not needed
rmdir /s /q .ai-powers
```

## 📁 Keep These

**DO NOT DELETE:**
- `mathf3-web/` - Main web application
- `python-scripts/` - Organized Python code
- `textbook/` - PDF reference
- `README.md` - Main documentation
- `PROJECT-STRUCTURE.md` - Structure guide
- `.gitignore` - Git rules
- `requirements.txt` - Python dependencies

## 🧹 Clean Structure

After cleanup, your structure should be:

```
touching_grass/
├── mathf3-web/          # ⭐ Main web app
├── python-scripts/      # 🐍 Python code
├── textbook/            # 📚 PDF reference
├── README.md
├── PROJECT-STRUCTURE.md
├── CLEANUP-GUIDE.md
├── .gitignore
└── requirements.txt
```

## 🔍 Verification

Check if folders are empty before deleting:

```bash
# Windows
dir math-play
dir mathf3
dir __pycache__

# If empty, safe to delete
```

## ⚠️ Important Notes

1. **Backup First**: If unsure, backup before deleting
2. **Check Dependencies**: Ensure no scripts reference old folders
3. **Git Status**: Run `git status` to see what's tracked
4. **Virtual Env**: Keep `.venv` if running Python scripts

## 🎯 Final State

After cleanup:
- Clean directory structure
- No duplicate files
- All code organized
- Documentation complete
- Ready for production

## 📝 Manual Cleanup Steps

If automated deletion fails:

1. Open File Explorer
2. Navigate to project root
3. Delete these folders manually:
   - `math-play` (if empty)
   - `mathf3` (if empty)
   - `__pycache__` (Python cache)
   - `.venv` (if not using Python)
   - `.ai-powers` (if not using)

4. Verify structure matches PROJECT-STRUCTURE.md

## ✨ Result

Clean, professional codebase ready for:
- Development
- Testing
- Deployment
- Collaboration
- Version control
