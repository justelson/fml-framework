# Form 3 Math Reference Implementation

The current Form 3 Math application (`mathf3-web/`) serves as the reference implementation for the FML Framework.

## Location
`../mathf3-web/`

## What to Study
1. **Formula Implementation**: `mathf3-web/src/lib/math.js` - JavaScript implementations
2. **AI Tools**: `mathf3-web/src/lib/aiTools.js` - Tool definitions for AI
3. **UI Components**: `mathf3-web/src/chapters/` - Chapter-based UI structure
4. **AI Integration**: `mathf3-web/src/lib/groqService.js` - AI service with explanations

## Key Features to Replicate
- Chapter-based navigation
- Interactive formula solvers
- AI-powered explanations with reasoning
- Markdown-formatted responses
- Dark/light theme support
- Responsive design

## How to Use This Reference
When building a new math application (e.g., Form 4, Form 5):
1. Copy the structure from `mathf3-web/`
2. Replace formulas with those from `fml-framework/formulas/`
3. Update chapter content for the new curriculum
4. Keep the AI integration and explanation system
5. Customize the theme and branding

## Python to JavaScript Conversion
The formulas in `fml-framework/formulas/` are in Python for clarity and portability.
When building a web app, convert them to JavaScript following the pattern in `mathf3-web/src/lib/math.js`.

Alternatively, you could:
- Build a Python backend API
- Use PyScript to run Python in the browser
- Use a Python-to-JavaScript transpiler
