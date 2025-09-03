import { Problem, GameState } from '../types';

export function createProblemDisplay(problem: Problem, gameState: GameState): string {
  const { currentProblemIndex, totalProblems, showHint } = gameState;
  
  const allAnswers = gameState.shuffledAnswers;
  
  return `
    <div class="ascii-box-double max-w-md mx-auto min-h-screen flex flex-col">
      <div class="text-center mb-6">
        <div class="text-terminal-white text-xl mb-2">THE CIPHER OF LOST PAGES</div>
        <div class="h-px bg-terminal-white mb-4"></div>
        <div class="text-terminal-gray">Problem ${currentProblemIndex + 1}/${totalProblems}</div>
      </div>

      <div class="ascii-box-single mb-6 text-center">
        <div class="text-terminal-gray mb-2">Kerro auki:</div>
        <div class="text-terminal-white text-lg font-bold">
          ${problem.expression} =
        </div>
      </div>

      <div class="flex-1">
        <div class="text-terminal-gray mb-4">Valitse oikea vastaus:</div>
        
        <div class="space-y-3" id="answer-options">
          ${allAnswers.map((answer, index) => `
            <button 
              class="terminal-button w-full text-left p-4 hover:bg-terminal-gray hover:bg-opacity-20" 
              data-answer="${answer}"
            >
              ${String.fromCharCode(65 + index)}) ${answer}
            </button>
          `).join('')}
        </div>
      </div>

      ${showHint ? `
        <div class="ascii-box-single mb-4 bg-terminal-yellow bg-opacity-10">
          <div class="text-terminal-yellow text-sm">
            💡 Vihje: ${problem.hint}
          </div>
        </div>
      ` : ''}

      <div class="flex justify-between items-center mt-6 text-sm">
        <button class="terminal-button px-4 py-2" id="reset-btn">reset</button>
        <button class="terminal-button px-4 py-2" id="hint-btn">${showHint ? 'piilota vihje' : 'vihje ?'}</button>
      </div>
    </div>
  `;
}