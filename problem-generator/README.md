# Math Problem Generator

🤖 DSPy-powered AI system for generating binomial expansion problems for "The Cipher of Lost Pages" math training game.

## 🎯 Purpose

Automatically generate structured math problems with:
- **Finnish hints and explanations** using FOIL method
- **Multiple difficulty levels** (easy, medium, hard)
- **Realistic wrong answer options** based on common student mistakes
- **Step-by-step explanations** with color-coded visual breakdown
- **Clean JSON export** for seamless app integration

## 📁 Project Structure

```
problem-generator/
├── README.md                 # This file
├── requirements.txt         # Python dependencies
├── .env.example            # Environment template
├── .env                    # Your API key (git-ignored)
├── signatures.py           # DSPy signatures for AI prompts
├── problem_generator.py    # Main generation logic
├── export_to_ts.py         # JSON export and merging
├── setup.py               # Installation helper
├── example_usage.py       # Demo and testing
├── venv/                  # Virtual environment
└── generated/             # Output directory
    └── generated_problems.json
```

## 🚀 Quick Start

### 1. First-time Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env and add your Google API key:
# GOOGLE_API_KEY=your_actual_api_key_here
```

### 2. Generate Problems
```bash
# Activate virtual environment
source venv/bin/activate

# Generate 15 new problems (5 easy, 5 medium, 5 hard)
python problem_generator.py

# Export to JSON and merge with existing problems
python export_to_ts.py
```

### 3. Results
After generation, you'll have:
- `generated/generated_problems.json` - Raw AI output
- `../src/data/generated_problems.json` - Clean problems only
- `../src/data/all_problems.json` - **Main file used by app (20 total problems)**

## 🔧 Configuration

### Model Settings (.env)
```env
GOOGLE_API_KEY=your_google_api_key_here
DSPY_MODEL=gemini-2.5-flash-lite
DSPY_MAX_TOKENS=1000
```

### Problem Generation Settings
Edit `problem_generator.py` to customize:
```python
# Number of problems per difficulty
problems = generator.generate_multiple_problems(
    easy_count=5,    # Simple coefficients (1-3)
    medium_count=5,  # Moderate coefficients (2-5)
    hard_count=5     # Complex coefficients (3-8)
)
```

## 📊 Output Format

Generated problems follow this JSON structure:
```json
{
  "id": "easy_1",
  "difficulty": "easy",
  "expression": "(x + 2)(x + 3)",
  "correctAnswer": "x² + 5x + 6",
  "wrongAnswers": ["x² + 6x + 6", "x² + 5x + 5"],
  "hint": "Käytä FOIL-menetelmää...",
  "explanation": {
    "steps": [
      { "term1": "x", "term2": "x", "result": "x²", "color": "yellow", "position": 1 }
    ],
    "finalSimplification": "x² + 5x + 6"
  }
}
```

## 🛠️ Advanced Usage

### Custom Generation
```bash
# Demo single problem generation
python example_usage.py

# Test basic functionality
python setup.py
```

### Manual Problem Editing
Edit `../src/data/all_problems.json` directly if needed, then restart the app.

## 🔒 Security Notes

- **.env files are git-ignored** - Your API keys stay private
- **Directory excluded from production** - DSPy tools don't go to Fly.io
- **Development only** - This system is for content generation, not production

## 🐛 Troubleshooting

### Common Issues

**"GOOGLE_API_KEY not found"**
```bash
# Make sure .env file exists and has your key
cp .env.example .env
# Edit .env and add: GOOGLE_API_KEY=your_key_here
```

**"Module 'dspy' has no attribute 'Google'"**
```bash
# Update dependencies
pip install --upgrade dspy-ai google-generativeai
```

**"Failed to load problems"**
- Check that JSON files exist in `../src/data/`
- Verify JSON syntax with `python -m json.tool file.json`

**Build errors in main app**
- Remove any leftover `.ts` files from `src/data/`
- Only use JSON files for production

## 📈 Scaling

To generate more problems:
1. **Increase counts** in `problem_generator.py`
2. **Add new difficulties** by modifying `signatures.py`
3. **Customize prompts** for different problem types
4. **Batch processing** for large-scale generation

## 🔄 Workflow Summary

```bash
# Development workflow
cd problem-generator
source venv/bin/activate

# Generate new content
python problem_generator.py     # Creates 15 new problems
python export_to_ts.py          # Merges with existing → all_problems.json

# Test in main app
cd ..
npm run dev                     # App loads all 20 problems

# Deploy to production
npm run build                   # Includes all JSON files
# Deploy to Fly.io (problem-generator/ excluded)
```

## 📄 License

Part of "The Cipher of Lost Pages" math training game.