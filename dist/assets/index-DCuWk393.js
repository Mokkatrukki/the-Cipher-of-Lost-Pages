var b=Object.defineProperty;var g=(i,e,t)=>e in i?b(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var m=(i,e,t)=>g(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const o=[{id:"p1",difficulty:"easy",expression:"(x + 1)(x + 2)",correctAnswer:"x² + 3x + 2",wrongAnswers:["x² + 2x + 2","x² + 3x + 3"],hint:"Käytä FOIL-menetelmää: First (ensimmäiset), Outer (ulommat), Inner (sisimmät), Last (viimeiset). Kerro jokainen termi ensimmäisestä sulkeesta jokaisella termillä toisesta.",explanation:{steps:[{term1:"x",term2:"x",result:"x²",color:"yellow",position:1},{term1:"x",term2:"2",result:"2x",color:"cyan",position:2},{term1:"1",term2:"x",result:"x",color:"purple",position:3},{term1:"1",term2:"2",result:"2",color:"green",position:4}],finalSimplification:"x² + 2x + x + 2 = x² + 3x + 2"}},{id:"p2",difficulty:"easy",expression:"(2x + 1)(x + 3)",correctAnswer:"2x² + 7x + 3",wrongAnswers:["2x² + 6x + 3","2x² + 7x + 4"],hint:"Aloita FOIL-menetelmällä: (2x)(x) = 2x², sitten (2x)(3) + (1)(x) + (1)(3).",explanation:{steps:[{term1:"2x",term2:"x",result:"2x²",color:"yellow",position:1},{term1:"2x",term2:"3",result:"6x",color:"cyan",position:2},{term1:"1",term2:"x",result:"x",color:"purple",position:3},{term1:"1",term2:"3",result:"3",color:"green",position:4}],finalSimplification:"2x² + 6x + x + 3 = 2x² + 7x + 3"}},{id:"p3",difficulty:"easy",expression:"(x - 1)(x + 4)",correctAnswer:"x² + 3x - 4",wrongAnswers:["x² - 3x - 4","x² + 4x - 4"],hint:"Varo etumerkkejä! (-1)(x) = -x ja (-1)(4) = -4. Yhdistä samanlaiset termit lopussa.",explanation:{steps:[{term1:"x",term2:"x",result:"x²",color:"yellow",position:1},{term1:"x",term2:"4",result:"4x",color:"cyan",position:2},{term1:"-1",term2:"x",result:"-x",color:"purple",position:3},{term1:"-1",term2:"4",result:"-4",color:"green",position:4}],finalSimplification:"x² + 4x - x - 4 = x² + 3x - 4"}},{id:"p4",difficulty:"medium",expression:"(3x - 1)(2x + 4)",correctAnswer:"6x² + 10x - 4",wrongAnswers:["6x² + 12x - 4","6x² + 8x - 4"],hint:"FOIL suuremmilla luvuilla: (3x)(2x)=6x², (3x)(4)=12x, (-1)(2x)=-2x, (-1)(4)=-4. Sitten yhdistä 12x-2x.",explanation:{steps:[{term1:"3x",term2:"2x",result:"6x²",color:"yellow",position:1},{term1:"3x",term2:"4",result:"12x",color:"cyan",position:2},{term1:"-1",term2:"2x",result:"-2x",color:"purple",position:3},{term1:"-1",term2:"4",result:"-4",color:"green",position:4}],finalSimplification:"6x² + 12x - 2x - 4 = 6x² + 10x - 4"}},{id:"p5",difficulty:"medium",expression:"(2x + 3)(3x - 2)",correctAnswer:"6x² + 5x - 6",wrongAnswers:["6x² + 7x - 6","6x² + 5x - 4"],hint:"Ole varovainen etumerkkien kanssa: (2x)(-2)=-4x ja (3)(3x)=9x. Lopulliset x-termit: -4x+9x=5x.",explanation:{steps:[{term1:"2x",term2:"3x",result:"6x²",color:"yellow",position:1},{term1:"2x",term2:"-2",result:"-4x",color:"cyan",position:2},{term1:"3",term2:"3x",result:"9x",color:"purple",position:3},{term1:"3",term2:"-2",result:"-6",color:"green",position:4}],finalSimplification:"6x² - 4x + 9x - 6 = 6x² + 5x - 6"}}];function f(i,e){const{currentProblemIndex:t,totalProblems:a,showHint:s}=e,r=[i.correctAnswer,...i.wrongAnswers].sort(()=>Math.random()-.5);return`
    <div class="ascii-box-double max-w-md mx-auto min-h-screen flex flex-col">
      <div class="text-center mb-6">
        <div class="text-terminal-white text-xl mb-2">THE CIPHER OF LOST PAGES</div>
        <div class="h-px bg-terminal-white mb-4"></div>
        <div class="text-terminal-gray">Problem ${t+1}/${a}</div>
      </div>

      <div class="ascii-box-single mb-6 text-center">
        <div class="text-terminal-gray mb-2">Kerro auki:</div>
        <div class="text-terminal-white text-lg font-bold">
          ${i.expression} =
        </div>
      </div>

      <div class="flex-1">
        <div class="text-terminal-gray mb-4">Valitse oikea vastaus:</div>
        
        <div class="space-y-3" id="answer-options">
          ${r.map((n,l)=>`
            <button 
              class="terminal-button w-full text-left p-4 hover:bg-terminal-gray hover:bg-opacity-20" 
              data-answer="${n}"
            >
              ${String.fromCharCode(65+l)}) ${n}
            </button>
          `).join("")}
        </div>
      </div>

      ${s?`
        <div class="ascii-box-single mb-4 bg-terminal-yellow bg-opacity-10">
          <div class="text-terminal-yellow text-sm">
            💡 Vihje: ${i.hint}
          </div>
        </div>
      `:""}

      <div class="flex justify-between items-center mt-6 text-sm">
        <button class="terminal-button px-4 py-2" id="reset-btn">reset</button>
        <button class="terminal-button px-4 py-2" id="hint-btn">${s?"piilota vihje":"vihje ?"}</button>
      </div>
    </div>
  `}function v(i,e,t){const{currentProblemIndex:a,totalProblems:s,selectedAnswer:r,showHint:n}=e,l=t?"terminal-green":"terminal-red",c=t?"✅":"❌",u=t?"CORRECT!":"WRONG, TRY AGAIN",p=[i.correctAnswer,...i.wrongAnswers].sort(()=>Math.random()-.5);return`
    <div class="ascii-box-double max-w-md mx-auto min-h-screen flex flex-col">
      <div class="text-center mb-6">
        <div class="text-terminal-white text-xl mb-2">THE CIPHER OF LOST PAGES</div>
        <div class="h-px bg-terminal-white mb-4"></div>
        <div class="text-terminal-gray">Problem ${a+1}/${s}</div>
      </div>

      <div class="text-center mb-6">
        <div class="text-${l} text-lg font-bold">
          ${c} ${u}
        </div>
      </div>

      <div class="ascii-box-single mb-6 text-center">
        <div class="text-terminal-white text-lg font-bold">
          ${i.expression} =
        </div>
      </div>

      <div class="flex-1">        
        <div class="space-y-3" id="answer-options">
          ${p.map((x,h)=>{let d="terminal-button w-full text-left p-4";return x===r&&(t?d+=" border-terminal-green bg-terminal-green bg-opacity-10":d+=" border-terminal-red bg-terminal-red bg-opacity-10"),`
              <button 
                class="${d}" 
                data-answer="${x}"
                ${t?"disabled":""}
              >
                ${String.fromCharCode(65+h)}) ${x}
              </button>
            `}).join("")}
        </div>
      </div>

      ${n&&!t?`
        <div class="ascii-box-single mb-4 bg-terminal-yellow bg-opacity-10">
          <div class="text-terminal-yellow text-sm">
            💡 Vihje: ${i.hint}
          </div>
        </div>
      `:""}

      <div class="flex justify-between items-center mt-6 text-sm">
        <button class="terminal-button px-4 py-2" id="reset-btn">reset</button>
        ${t?'<button class="terminal-button px-4 py-2" id="next-btn">next →</button>':`<button class="terminal-button px-4 py-2" id="hint-btn">${n?"piilota vihje":"vihje ?"}</button>`}
      </div>
    </div>
  `}class w{constructor(){m(this,"gameState");m(this,"currentProblem");m(this,"appElement");this.appElement=document.querySelector("#app"),this.gameState={currentProblemIndex:0,totalProblems:o.length,score:0,selectedAnswer:null,showExplanation:!1,showHint:!1,gamePhase:"problem"},this.currentProblem=o[0],this.init()}init(){this.loadGameState(),this.render(),this.attachEventListeners()}loadGameState(){const e=localStorage.getItem("cipher-game-state");if(e){const t=JSON.parse(e);this.gameState={...this.gameState,...t},this.currentProblem=o[this.gameState.currentProblemIndex]}}saveGameState(){localStorage.setItem("cipher-game-state",JSON.stringify(this.gameState))}render(){let e="";switch(this.gameState.gamePhase){case"problem":e=f(this.currentProblem,this.gameState);break;case"feedback":const t=this.gameState.selectedAnswer===this.currentProblem.correctAnswer;e=v(this.currentProblem,this.gameState,t);break;case"explanation":e='<div class="text-center p-8">Explanation view coming soon...</div>';break;case"complete":e='<div class="text-center p-8">Game complete! 🎉</div>';break}this.appElement.innerHTML=e,this.attachEventListeners()}attachEventListeners(){this.appElement.querySelectorAll("[data-answer]").forEach(r=>{r.addEventListener("click",n=>{const c=n.target.dataset.answer;c&&this.handleAnswerSelection(c)})});const t=this.appElement.querySelector("#next-btn");t&&t.addEventListener("click",()=>{this.handleNextProblem()});const a=this.appElement.querySelector("#reset-btn");a&&a.addEventListener("click",()=>{this.reset()});const s=this.appElement.querySelector("#hint-btn");s&&s.addEventListener("click",()=>{this.toggleHint()})}handleAnswerSelection(e){this.gameState.selectedAnswer=e,e===this.currentProblem.correctAnswer?(this.gameState.score++,this.gameState.gamePhase="feedback"):this.gameState.gamePhase="feedback",this.saveGameState(),this.render()}handleNextProblem(){this.gameState.currentProblemIndex<o.length-1?(this.gameState.currentProblemIndex++,this.currentProblem=o[this.gameState.currentProblemIndex],this.gameState.gamePhase="problem",this.gameState.selectedAnswer=null,this.gameState.showHint=!1):this.gameState.gamePhase="complete",this.saveGameState(),this.render()}toggleHint(){this.gameState.showHint=!this.gameState.showHint,this.saveGameState(),this.render()}reset(){this.gameState={currentProblemIndex:0,totalProblems:o.length,score:0,selectedAnswer:null,showExplanation:!1,showHint:!1,gamePhase:"problem"},this.currentProblem=o[0],this.saveGameState(),this.render()}}const y=new w;window.resetGame=()=>y.reset();
//# sourceMappingURL=index-DCuWk393.js.map
