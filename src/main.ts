import './style.css';
import { Problem, GameState } from './types';
import { PROBLEMS } from './data/problems';
import { createProblemDisplay } from './components/ProblemDisplay';
import { createFeedbackDisplay } from './components/FeedbackDisplay';

class GameApp {
  private gameState: GameState;
  private currentProblem: Problem;
  private appElement: HTMLElement;

  constructor() {
    this.appElement = document.querySelector<HTMLDivElement>('#app')!;
    this.gameState = {
      currentProblemIndex: 0,
      totalProblems: PROBLEMS.length,
      score: 0,
      selectedAnswer: null,
      showExplanation: false,
      showHint: false,
      gamePhase: 'problem',
      shuffledAnswers: this.shuffleAnswers(PROBLEMS[0])
    };
    this.currentProblem = PROBLEMS[0];
    this.init();
  }

  private init() {
    this.loadGameState();
    this.render();
    this.attachEventListeners();
  }

  private loadGameState() {
    const saved = localStorage.getItem('cipher-game-state');
    if (saved) {
      const savedState = JSON.parse(saved);
      this.gameState = { ...this.gameState, ...savedState };
      this.currentProblem = PROBLEMS[this.gameState.currentProblemIndex];
    }
  }

  private saveGameState() {
    localStorage.setItem('cipher-game-state', JSON.stringify(this.gameState));
  }

  private render() {
    let html = '';
    
    switch (this.gameState.gamePhase) {
      case 'problem':
        html = createProblemDisplay(this.currentProblem, this.gameState);
        break;
      case 'feedback':
        const isCorrect = this.gameState.selectedAnswer === this.currentProblem.correctAnswer;
        html = createFeedbackDisplay(this.currentProblem, this.gameState, isCorrect);
        break;
      case 'explanation':
        // TODO: Implement explanation view
        html = '<div class="text-center p-8">Explanation view coming soon...</div>';
        break;
      case 'complete':
        html = '<div class="text-center p-8">Game complete! 🎉</div>';
        break;
    }
    
    this.appElement.innerHTML = html;
    this.attachEventListeners();
  }

  private shuffleAnswers(problem: Problem): string[] {
    const allAnswers = [problem.correctAnswer, ...problem.wrongAnswers];
    return allAnswers.sort(() => Math.random() - 0.5);
  }

  private attachEventListeners() {
    // Answer selection
    const answerButtons = this.appElement.querySelectorAll('[data-answer]');
    answerButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const answer = target.dataset.answer;
        if (answer) {
          this.handleAnswerSelection(answer);
        }
      });
    });

    // Next button
    const nextBtn = this.appElement.querySelector('#next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.handleNextProblem();
      });
    }

    // Reset button
    const resetBtn = this.appElement.querySelector('#reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.reset();
      });
    }

    // Hint button
    const hintBtn = this.appElement.querySelector('#hint-btn');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        this.toggleHint();
      });
    }
  }

  private handleAnswerSelection(answer: string) {
    this.gameState.selectedAnswer = answer;
    const isCorrect = answer === this.currentProblem.correctAnswer;
    
    if (isCorrect) {
      this.gameState.score++;
      this.gameState.gamePhase = 'feedback';
    } else {
      this.gameState.gamePhase = 'feedback';
    }
    
    this.saveGameState();
    this.render();
  }

  private handleNextProblem() {
    if (this.gameState.currentProblemIndex < PROBLEMS.length - 1) {
      this.gameState.currentProblemIndex++;
      this.currentProblem = PROBLEMS[this.gameState.currentProblemIndex];
      this.gameState.gamePhase = 'problem';
      this.gameState.selectedAnswer = null;
      this.gameState.showHint = false; // Reset hint for new problem
      this.gameState.shuffledAnswers = this.shuffleAnswers(this.currentProblem); // Shuffle answers for new problem
    } else {
      this.gameState.gamePhase = 'complete';
    }
    
    this.saveGameState();
    this.render();
  }

  private toggleHint() {
    this.gameState.showHint = !this.gameState.showHint;
    this.saveGameState();
    this.render();
  }

  // Public method to reset game
  reset() {
    this.gameState = {
      currentProblemIndex: 0,
      totalProblems: PROBLEMS.length,
      score: 0,
      selectedAnswer: null,
      showExplanation: false,
      showHint: false,
      gamePhase: 'problem',
      shuffledAnswers: this.shuffleAnswers(PROBLEMS[0])
    };
    this.currentProblem = PROBLEMS[0];
    this.saveGameState();
    this.render();
  }
}

// Initialize the game
const game = new GameApp();

// Make reset available globally for debugging
(window as any).resetGame = () => game.reset();