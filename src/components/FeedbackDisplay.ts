import { Problem, GameState } from '../types';

export function createFeedbackDisplay(
  problem: Problem, 
  gameState: GameState, 
  isCorrect: boolean
): string {
  const { currentProblemIndex, totalProblems, selectedAnswer, showHint } = gameState;
  
  const feedbackColor = isCorrect ? 'terminal-green' : 'terminal-red';
  const feedbackText = isCorrect ? 'CORRECT!' : 'WRONG, TRY AGAIN';
  
  const allAnswers = gameState.shuffledAnswers;
  
  return `
    <div class="ascii-box-double max-w-md mx-auto min-h-screen flex flex-col">
      <div class="text-center mb-6">
        <div class="text-terminal-white text-xl mb-2">THE CIPHER OF LOST PAGES</div>
        <div class="h-px bg-terminal-white mb-4"></div>
        <div class="text-terminal-gray">Problem ${currentProblemIndex + 1}/${totalProblems}</div>
      </div>

      <div class="text-center mb-6">
        <div class="text-${feedbackColor} text-lg font-bold">
          ${feedbackText}
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

      ${showHint && !isCorrect ? `
        <div class="ascii-box-single mb-4 bg-terminal-yellow bg-opacity-10">
          <div class="text-terminal-yellow text-sm">
            Vihje: ${problem.hint}
          </div>
        </div>
      ` : ''}

      ${isCorrect ? `
        <div class="ascii-box-single mb-4">
          <div class="text-terminal-white mb-3">
            <strong>Näin se ratkaistaan:</strong>
          </div>
          <div class="font-mono text-sm space-y-2">
            <div class="text-terminal-white mb-2">${problem.expression}</div>
            ${problem.explanation.steps.map(step => `
              <div class="text-terminal-white">
                ${step.term1} × ${step.term2} = ${step.result}
              </div>
            `).join('')}
            <div class="text-terminal-white mt-3 pt-2 border-t border-terminal-gray">
              ${problem.explanation.finalSimplification}
            </div>
          </div>
        </div>
      ` : ''}

      <div class="flex justify-between items-center mt-6 text-sm">
        <button class="terminal-button px-4 py-2" id="reset-btn">reset</button>
        ${isCorrect 
          ? '<button class="terminal-button px-4 py-2" id="next-btn">next →</button>'
          : `<button class="terminal-button px-4 py-2" id="hint-btn">${showHint ? 'piilota vihje' : 'vihje ?'}</button>`
        }
      </div>
    </div>
  `;
}