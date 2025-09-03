import { Problem } from '../types';

export const PROBLEMS: Problem[] = [
  {
    id: "p1",
    difficulty: "easy",
    expression: "(x + 1)(x + 2)",
    correctAnswer: "x² + 3x + 2",
    wrongAnswers: ["x² + 2x + 2", "x² + 3x + 3"],
    hint: "Käytä FOIL-menetelmää: First (ensimmäiset), Outer (ulommat), Inner (sisimmät), Last (viimeiset). Kerro jokainen termi ensimmäisestä sulkeesta jokaisella termillä toisesta.",
    explanation: {
      steps: [
        { term1: "x", term2: "x", result: "x²", color: "yellow", position: 1 },
        { term1: "x", term2: "2", result: "2x", color: "cyan", position: 2 },
        { term1: "1", term2: "x", result: "x", color: "purple", position: 3 },
        { term1: "1", term2: "2", result: "2", color: "green", position: 4 }
      ],
      finalSimplification: "x² + 2x + x + 2 = x² + 3x + 2"
    }
  },
  {
    id: "p2", 
    difficulty: "easy",
    expression: "(2x + 1)(x + 3)",
    correctAnswer: "2x² + 7x + 3",
    wrongAnswers: ["2x² + 6x + 3", "2x² + 7x + 4"],
    hint: "Aloita FOIL-menetelmällä: (2x)(x) = 2x², sitten (2x)(3) + (1)(x) + (1)(3).",
    explanation: {
      steps: [
        { term1: "2x", term2: "x", result: "2x²", color: "yellow", position: 1 },
        { term1: "2x", term2: "3", result: "6x", color: "cyan", position: 2 },
        { term1: "1", term2: "x", result: "x", color: "purple", position: 3 },
        { term1: "1", term2: "3", result: "3", color: "green", position: 4 }
      ],
      finalSimplification: "2x² + 6x + x + 3 = 2x² + 7x + 3"
    }
  },
  {
    id: "p3",
    difficulty: "easy", 
    expression: "(x - 1)(x + 4)",
    correctAnswer: "x² + 3x - 4",
    wrongAnswers: ["x² - 3x - 4", "x² + 4x - 4"],
    hint: "Varo etumerkkejä! (-1)(x) = -x ja (-1)(4) = -4. Yhdistä samanlaiset termit lopussa.",
    explanation: {
      steps: [
        { term1: "x", term2: "x", result: "x²", color: "yellow", position: 1 },
        { term1: "x", term2: "4", result: "4x", color: "cyan", position: 2 },
        { term1: "-1", term2: "x", result: "-x", color: "purple", position: 3 },
        { term1: "-1", term2: "4", result: "-4", color: "green", position: 4 }
      ],
      finalSimplification: "x² + 4x - x - 4 = x² + 3x - 4"
    }
  },
  {
    id: "p4",
    difficulty: "medium",
    expression: "(3x - 1)(2x + 4)",
    correctAnswer: "6x² + 10x - 4", 
    wrongAnswers: ["6x² + 12x - 4", "6x² + 8x - 4"],
    hint: "FOIL suuremmilla luvuilla: (3x)(2x)=6x², (3x)(4)=12x, (-1)(2x)=-2x, (-1)(4)=-4. Sitten yhdistä 12x-2x.",
    explanation: {
      steps: [
        { term1: "3x", term2: "2x", result: "6x²", color: "yellow", position: 1 },
        { term1: "3x", term2: "4", result: "12x", color: "cyan", position: 2 },
        { term1: "-1", term2: "2x", result: "-2x", color: "purple", position: 3 },
        { term1: "-1", term2: "4", result: "-4", color: "green", position: 4 }
      ],
      finalSimplification: "6x² + 12x - 2x - 4 = 6x² + 10x - 4"
    }
  },
  {
    id: "p5",
    difficulty: "medium",
    expression: "(2x + 3)(3x - 2)",
    correctAnswer: "6x² + 5x - 6",
    wrongAnswers: ["6x² + 7x - 6", "6x² + 5x - 4"],
    hint: "Ole varovainen etumerkkien kanssa: (2x)(-2)=-4x ja (3)(3x)=9x. Lopulliset x-termit: -4x+9x=5x.",
    explanation: {
      steps: [
        { term1: "2x", term2: "3x", result: "6x²", color: "yellow", position: 1 },
        { term1: "2x", term2: "-2", result: "-4x", color: "cyan", position: 2 },
        { term1: "3", term2: "3x", result: "9x", color: "purple", position: 3 },
        { term1: "3", term2: "-2", result: "-6", color: "green", position: 4 }
      ],
      finalSimplification: "6x² - 4x + 9x - 6 = 6x² + 5x - 6"
    }
  }
];