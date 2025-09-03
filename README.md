# The Cipher of Lost Pages

A mobile-first math training game with terminal/ASCII aesthetic for practicing binomial expansion (algebraic multiplication). Built to help students learn step-by-step problem solving with visual explanations.

## 🎯 Current Features (v0.1)

### ✅ Core Game Mechanics
- **5 Problems**: Binomial expansion exercises from easy to medium difficulty
- **Multiple Choice**: 3 answer options per problem with randomized order
- **Progress Tracking**: Shows current problem (3/5) and saves progress in localStorage
- **Score System**: Tracks correct answers throughout the session
- **Problem Progression**: Sequential flow through difficulty levels

### ✅ Terminal Aesthetics
- **ASCII Borders**: Clean terminal-style boxes using `┌─────┐` and `╔═════╗` styles
- **Monospace Font**: Courier New for authentic terminal feel
- **Terminal Colors**: Green/red feedback, yellow hints, cyan highlights
- **Mobile-First**: Touch-friendly buttons optimized for "nakkisormet"
- **Responsive Design**: Works on mobile and desktop with proper tap targets

### ✅ Learning Features
- **Finnish Hints**: Contextual help explaining FOIL method in Finnish
  - Toggle visibility with "vihje ?" / "piilota vihje" button
  - Explains common mistakes and step-by-step approach
  - Auto-hides when moving to next problem
- **Smart Wrong Answers**: Deliberately chosen incorrect options that represent common student mistakes
- **Immediate Feedback**: Visual confirmation of correct/incorrect answers

### ✅ User Experience
- **Reset Functionality**: "reset" button to start over completely
- **State Persistence**: Game progress saved in localStorage
- **Hot Reloading**: Development server with instant updates
- **Error Handling**: Graceful handling of invalid states

## 📁 Project Structure

```
src/
├── components/
│   ├── ProblemDisplay.ts      # Main problem view with answers
│   └── FeedbackDisplay.ts     # Correct/wrong feedback screen
├── data/
│   └── problems.ts            # 5 hardcoded problems with hints
├── types.ts                   # TypeScript interfaces
├── main.ts                    # Game logic and state management
└── style.css                  # Terminal-themed CSS with Tailwind
```

## 🎮 Game Flow

1. **Problem Display**: Shows algebraic expression like `(3x - 1)(2x + 4) =`
2. **Answer Selection**: 3 multiple choice options (A, B, C)
3. **Feedback**: Shows correct/wrong with visual highlighting
4. **Hint System**: Optional Finnish explanations using FOIL method
5. **Progression**: Move to next problem or reset to start over

## 🧮 Problem Examples

### Easy Problems
- `(x + 1)(x + 2) = x² + 3x + 2`
- `(2x + 1)(x + 3) = 2x² + 7x + 3`
- `(x - 1)(x + 4) = x² + 3x - 4`

### Medium Problems  
- `(3x - 1)(2x + 4) = 6x² + 10x - 4`
- `(2x + 3)(3x - 2) = 6x² + 5x - 6`

## 🎨 Technical Stack

- **TypeScript** - Type-safe JavaScript with modern features
- **Vite** - Fast development server with hot reloading  
- **Tailwind CSS** - Utility-first styling with custom terminal theme
- **Vanilla JS** - No framework dependencies, pure DOM manipulation
- **localStorage** - Client-side state persistence

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build
```

## 🎯 Finnish Hint Examples

- **"Käytä FOIL-menetelmää: First (ensimmäiset), Outer (ulommat), Inner (sisimmät), Last (viimeiset)"**
- **"Varo etumerkkejä! (-1)(x) = -x ja (-1)(4) = -4"** 
- **"FOIL suuremmilla luvuilla: (3x)(2x)=6x², (3x)(4)=12x, (-1)(2x)=-2x, (-1)(4)=-4"**

## 🔮 Planned Features (Future Versions)

### Phase 2: Visual Explanations
- [ ] Interactive step-by-step breakdown with colors and arrows
- [ ] Animated FOIL method demonstration  
- [ ] "Sinun pitää kertoa tämä tällä ja tällä" visual guidance
- [ ] SVG arrows connecting terms during multiplication

### Phase 3: Enhanced Game Elements
- [ ] Difficulty selection system ("harder" / "same level")
- [ ] Points and streak tracking
- [ ] Multiple terminal themes (green-on-black, amber, etc.)
- [ ] Sound effects and animations

### Phase 4: Advanced Features  
- [ ] Problem generator AI integration (PSDy)
- [ ] SQLite database for progress tracking
- [ ] Helper character in footer (old game style)
- [ ] Statistics and learning analytics
- [ ] More problem categories (fractions, exponents, etc.)

## 🎨 Design Philosophy

The app combines:
- **Terminal Aesthetics** - Clean, focused, programmer-friendly interface
- **Finnish Education** - Localized hints and explanations
- **Mobile-First** - Optimized for touch interaction on phones
- **Step-by-Step Learning** - Breaking complex algebra into manageable pieces
- **Visual Feedback** - Clear indication of progress and correctness

Built with love for mathematical learning and terminal aesthetics! 🧮✨