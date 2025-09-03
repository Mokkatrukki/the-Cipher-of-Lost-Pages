# The Cipher of Lost Pages - Planning Document

## Project Overview
A mobile-first math training game with terminal/ASCII aesthetic. Focus on binomial expansion with step-by-step explanations shown after correct answers.

## Technical Specifications

### Visual Style
- **Terminal Theme**: ASCII borders with monospace fonts and basic terminal colors
- **Border Style**: Mix of `┌─────┐` and `╔═════╗` styles
- **Touch-Friendly**: Full-width buttons with clear tap targets
- **Navigation**: Arrow indicators for back/forward (`← back` | `next →`)

### Data & Storage
- **Problems**: Start with 10 hardcoded binomial expansion problems
- **Storage**: localStorage for POC, migrate to SQLite later
- **Progress**: Track correct/incorrect answers and allow difficulty selection

### Game Flow
- **Wrong Answers**: "Wrong, try again" message with immediate retry
- **Difficulty**: User can choose "harder" or "same level" after each problem
- **Explanations**: Visual step-by-step breakdown shown only after correct answer

## ASCII UI Designs

### 1. Main Problem View
```
╔═════════════════════════════════════╗
║  THE CIPHER OF LOST PAGES           ║
╠═════════════════════════════════════╣
║                                     ║
║  Problem 3/10                       ║
║                                     ║
║  ┌─────────────────────────────┐    ║
║  │ Kerro auki:                 │    ║
║  │                             │    ║
║  │   (3x - 1)(2x + 4) =        │    ║
║  └─────────────────────────────┘    ║
║                                     ║
║  Valitse oikea vastaus:             ║
║                                     ║
║  ╔═══════════════════════════════╗  ║
║  ║ A) 6x² + 12x - 2x - 4        ║  ║
║  ╚═══════════════════════════════╝  ║
║  ┌───────────────────────────────┐  ║
║  │ B) 6x² + 8x - 4              │  ║
║  └───────────────────────────────┘  ║
║  ┌───────────────────────────────┐  ║
║  │ C) 6x² + 10x - 4             │  ║
║  └───────────────────────────────┘  ║
║                                     ║
║  [← back]              [hint ?]     ║
╚═════════════════════════════════════╝
```

### 2. Wrong Answer View
```
╔═════════════════════════════════════╗
║  THE CIPHER OF LOST PAGES           ║
╠═════════════════════════════════════╣
║                                     ║
║  ❌ WRONG, TRY AGAIN                ║
║                                     ║
║  ┌─────────────────────────────┐    ║
║  │ (3x - 1)(2x + 4) =          │    ║
║  └─────────────────────────────┘    ║
║                                     ║
║  ╔═══════════════════════════════╗  ║
║  ║ A) 6x² + 12x - 2x - 4        ║  ║
║  ╚═══════════════════════════════╝  ║
║  ┌───────────────────────────────┐  ║
║  │ B) 6x² + 8x - 4              │  ║
║  └───────────────────────────────┘  ║
║  ┌───────────────────────────────┐  ║
║  │ C) 6x² + 10x - 4             │  ║
║  └───────────────────────────────┘  ║
║                                     ║
║  [← back]              [hint ?]     ║
╚═════════════════════════════════════╝
```

### 3. Correct Answer + Visual Explanation
```
╔═════════════════════════════════════╗
║  THE CIPHER OF LOST PAGES           ║
╠═════════════════════════════════════╣
║                                     ║
║  ✅ CORRECT!                        ║
║                                     ║
║  ┌─────────────────────────────┐    ║
║  │ Näin se ratkaistaan:        │    ║
║  │                             │    ║
║  │ (3x - 1)(2x + 4)            │    ║
║  │  │     │  │    │             │    ║
║  │  │     │  └────┼──→ 3x×4=12x │    ║
║  │  │     └───────┼──→ -1×2x=-2x│    ║
║  │  └─────────────┼──→ -1×4=-4  │    ║
║  │                └──→ 3x×2x=6x²│    ║
║  │                             │    ║
║  │ = 6x² + 12x - 2x - 4        │    ║
║  │ = 6x² + 10x - 4             │    ║
║  └─────────────────────────────┘    ║
║                                     ║
║  [← back]              [next →]     ║
╚═════════════════════════════════════╝
```

### 4. Difficulty Selection
```
╔═════════════════════════════════════╗
║  THE CIPHER OF LOST PAGES           ║
╠═════════════════════════════════════╣
║                                     ║
║  Great job! 🎯                      ║
║  Problem 3/10 completed             ║
║                                     ║
║  Choose next difficulty:            ║
║                                     ║
║  ╔═══════════════════════════════╗  ║
║  ║ SAME LEVEL                    ║  ║
║  ║ More problems like this       ║  ║
║  ╚═══════════════════════════════╝  ║
║                                     ║
║  ┌───────────────────────────────┐  ║
║  │ HARDER                        │  ║
║  │ Bigger numbers & complexity   │  ║
║  └───────────────────────────────┘  ║
║                                     ║
║  [← menu]              [stats]      ║
╚═════════════════════════════════════╝
```

## Data Structure

### Problem Definition
```typescript
interface Problem {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  expression: string;          // "(3x - 1)(2x + 4)"
  correctAnswer: string;       // "6x² + 10x - 4"
  wrongAnswers: string[];      // Common mistakes
  explanation: {
    steps: ExplanationStep[];
    finalSimplification: string;
  };
}

interface ExplanationStep {
  term1: string;               // "3x"
  term2: string;               // "2x"
  result: string;              // "6x²"
  color: string;               // For visual highlighting
  position: number;            // Order of explanation
}
```

### Initial Problem Set (10 Problems)
```typescript
const PROBLEMS: Problem[] = [
  // Easy (coefficients 1-3)
  { expression: "(x + 1)(x + 2)", correct: "x² + 3x + 2" },
  { expression: "(2x + 1)(x + 3)", correct: "2x² + 7x + 3" },
  { expression: "(x - 1)(x + 4)", correct: "x² + 3x - 4" },
  
  // Medium (coefficients 2-4, negatives)
  { expression: "(3x - 1)(2x + 4)", correct: "6x² + 10x - 4" },
  { expression: "(2x + 3)(3x - 2)", correct: "6x² + 5x - 6" },
  { expression: "(4x - 1)(x + 2)", correct: "4x² + 7x - 2" },
  
  // Hard (larger coefficients, both negatives)
  { expression: "(3x - 2)(2x - 5)", correct: "6x² - 19x + 10" },
  { expression: "(5x + 1)(2x - 3)", correct: "10x² - 13x - 3" },
  { expression: "(4x - 3)(3x + 1)", correct: "12x² - 5x - 3" },
  { expression: "(2x - 4)(3x - 1)", correct: "6x² - 14x + 4" }
];
```

## Development Plan

### Phase 1: Core Setup ✓
- [x] TypeScript + Vite + Tailwind setup
- [x] Basic project structure
- [x] Hot reloading development server

### Phase 2: Basic UI & Flow
- [ ] ASCII-styled components with terminal colors
- [ ] Problem display with touch-friendly answer buttons  
- [ ] Wrong/correct answer feedback
- [ ] localStorage for progress tracking

### Phase 3: Visual Explanations
- [ ] Step-by-step breakdown with colors and arrows
- [ ] FOIL method visualization
- [ ] Smooth transitions between explanation steps

### Phase 4: Polish
- [ ] Difficulty progression system
- [ ] Terminal color themes
- [ ] Mobile optimization and testing

## Color Scheme (Terminal Inspired)
```css
:root {
  --terminal-bg: #1a1a1a;
  --terminal-green: #00ff00;
  --terminal-white: #ffffff;
  --terminal-yellow: #ffff00;
  --terminal-red: #ff0000;
  --terminal-cyan: #00ffff;
  --terminal-purple: #ff00ff;
  
  --correct-color: var(--terminal-green);
  --wrong-color: var(--terminal-red);
  --highlight-1: var(--terminal-yellow);
  --highlight-2: var(--terminal-cyan);
  --highlight-3: var(--terminal-purple);
}
```

Ready to start building! Let's get the core structure up with hot reloading first.