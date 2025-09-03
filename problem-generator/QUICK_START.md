# Quick Reference - Problem Generator

## 🚀 Generate New Problems (TL;DR)

```bash
# One-time setup
cd problem-generator
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add your GOOGLE_API_KEY to .env

# Generate problems (any time)
source venv/bin/activate
python problem_generator.py    # Creates 15 new problems
python export_to_ts.py         # Merges → all_problems.json

# Test
cd ..
npm run dev                    # App now has 20+ problems
```

## 📁 Key Files
- `venv/` - Python environment (git-ignored)
- `.env` - Your Google API key (git-ignored) 
- `generated_problems.json` - Raw AI output
- `../src/data/all_problems.json` - **App uses this file**

## 🔧 Customization
Edit `problem_generator.py`:
```python
# Change problem counts
easy_count=10, medium_count=10, hard_count=10  # = 30 total problems
```

## 🐛 Common Issues
- **Missing API key**: Add `GOOGLE_API_KEY=...` to `.env` 
- **Import errors**: `pip install --upgrade dspy-ai`
- **JSON errors**: Check syntax with `python -m json.tool file.json`

## ✅ Success Indicators
- Console shows: "Generated X problems!" 
- File `../src/data/all_problems.json` exists and has 20+ problems
- App loads without "Failed to load problems" errors
- Build completes: `npm run build` ✅

That's it! 🎯