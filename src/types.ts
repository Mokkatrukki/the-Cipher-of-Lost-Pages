export interface Problem {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  expression: string;
  correctAnswer: string;
  wrongAnswers: string[];
  hint: string;
  explanation: {
    steps: ExplanationStep[];
    finalSimplification: string;
  };
}

export interface ExplanationStep {
  term1: string;
  term2: string;
  result: string;
  color: string;
  position: number;
}

export interface GameState {
  currentProblemIndex: number;
  totalProblems: number;
  score: number;
  selectedAnswer: string | null;
  showExplanation: boolean;
  showHint: boolean;
  gamePhase: 'problem' | 'feedback' | 'explanation' | 'complete';
}