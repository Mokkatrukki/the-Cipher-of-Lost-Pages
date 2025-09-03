import { Problem, GameState } from '../types';

export function createFeedbackDisplay(
  problem: Problem, 
  gameState: GameState, 
  isCorrect: boolean
): string {
  const { currentProblemIndex, totalProblems, selectedAnswer } = gameState;
  
  const feedbackColor = isCorrect ? 'terminal-green' : 'terminal-red';
  const feedbackIcon = isCorrect ? '✅' : '❌';
  const feedbackText = isCorrect ? 'CORRECT!' : 'WRONG, TRY AGAIN';
  
  const allAnswers = [problem.correctAnswer, ...problem.wrongAnswers].sort(() => Math.random() - 0.5);
  
  return `
    <div class="ascii-box-double max-w-md mx-auto min-h-screen flex flex-col">
      <div class="text-center mb-6">
        <div class="text-terminal-white text-xl mb-2">THE CIPHER OF LOST PAGES</div>
        <div class="h-px bg-terminal-white mb-4"></div>
        <div class="text-terminal-gray">Problem ${currentProblemIndex + 1}/${totalProblems}</div>
      </div>

      <div class="text-center mb-6">
        <div class="text-${feedbackColor} text-lg font-bold">
          ${feedbackIcon} ${feedbackText}
        </div>
      </div>

      <div class="ascii-box-single mb-6 text-center">
        <div class="text-terminal-white text-lg font-bold">
          ${problem.expression} =
        </div>
      </div>

      <div class="flex-1">        
        <div class="space-y-3" id="answer-options">
          ${allAnswers.map((answer, index) => {
            let buttonClass = 'terminal-button w-full text-left p-4';
            
            if (answer === selectedAnswer) {
              if (isCorrect) {
                buttonClass += ' border-terminal-green bg-terminal-green bg-opacity-10';
              } else {
                buttonClass += ' border-terminal-red bg-terminal-red bg-opacity-10';
              }
            }
            
            return `
              <button 
                class="${buttonClass}" 
                data-answer="${answer}"
                ${isCorrect ? 'disabled' : ''}
              >
                ${String.fromCharCode(65 + index)}) ${answer}
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div class="flex justify-between items-center mt-6 text-sm">
        <button class="terminal-button px-4 py-2">← back</button>
        ${isCorrect 
          ? '<button class="terminal-button px-4 py-2" id="next-btn">next →</button>'
          : '<button class="terminal-button px-4 py-2">hint ?</button>'
        }
      </div>
    </div>
  `;
}