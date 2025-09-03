import dspy
import os
import json
from dotenv import load_dotenv
from signatures import BinomialProblemGenerator, ProblemRefinement
from typing import List, Dict, Any

# Load environment variables
load_dotenv()

class MathProblemGenerator:
    def __init__(self):
        # Configure DSPy to use Gemini
        google_api_key = os.getenv('GOOGLE_API_KEY')
        if not google_api_key:
            raise ValueError("GOOGLE_API_KEY not found in environment variables")
        
        # Set up Gemini model via LiteLLM
        import litellm
        litellm.set_verbose = False
        
        from dspy import LM
        gemini_model = LM(
            model="gemini/gemini-2.5-flash-lite", 
            api_key=google_api_key,
            max_tokens=1000
        )
        dspy.settings.configure(lm=gemini_model)
        
        # Initialize DSPy modules
        self.problem_generator = dspy.ChainOfThought(BinomialProblemGenerator)
        self.problem_refiner = dspy.ChainOfThought(ProblemRefinement)
    
    def generate_problem(self, difficulty: str = "medium") -> Dict[str, Any]:
        """Generate a single binomial expansion problem."""
        
        # Create detailed prompt based on difficulty
        difficulty_specs = {
            "easy": "Use small coefficients (1-3), avoid double negatives, simple integers",
            "medium": "Use moderate coefficients (2-5), include some negatives, realistic complexity",
            "hard": "Use larger coefficients (3-8), multiple negatives, challenging combinations"
        }
        
        # Generate initial problem
        result = self.problem_generator(
            difficulty=f"{difficulty}: {difficulty_specs.get(difficulty, '')}",
            problem_count=1
        )
        
        # Validate and refine the problem
        wrong_answers = f"{result.wrong_answer_1}|{result.wrong_answer_2}"
        validation = self.problem_refiner(
            expression=result.expression,
            correct_answer=result.correct_answer,
            wrong_answers=wrong_answers
        )
        
        # Structure the problem data
        problem_data = {
            "expression": result.expression,
            "correctAnswer": validation.corrected_answer if validation.is_valid == "NO" else result.correct_answer,
            "wrongAnswers": validation.improved_wrong_answers.split("|") if validation.improved_wrong_answers else [result.wrong_answer_1, result.wrong_answer_2],
            "hint": result.finnish_hint,
            "difficulty": difficulty,
            "explanation": {
                "steps": [
                    {
                        "term1": result.term1_1,
                        "term2": result.term1_2,
                        "result": result.result1,
                        "color": "yellow",
                        "position": 1
                    },
                    {
                        "term1": result.term2_1,
                        "term2": result.term2_2,
                        "result": result.result2,
                        "color": "cyan",
                        "position": 2
                    },
                    {
                        "term1": result.term3_1,
                        "term2": result.term3_2,
                        "result": result.result3,
                        "color": "purple",
                        "position": 3
                    },
                    {
                        "term1": result.term4_1,
                        "term2": result.term4_2,
                        "result": result.result4,
                        "color": "green",
                        "position": 4
                    }
                ],
                "finalSimplification": result.final_simplified
            }
        }
        
        return problem_data
    
    def generate_multiple_problems(self, easy_count: int = 3, medium_count: int = 4, hard_count: int = 3) -> List[Dict[str, Any]]:
        """Generate multiple problems across difficulty levels."""
        problems = []
        
        # Generate easy problems
        for i in range(easy_count):
            try:
                problem = self.generate_problem("easy")
                problem["id"] = f"easy_{i+1}"
                problems.append(problem)
                print(f"Generated easy problem {i+1}/{easy_count}")
            except Exception as e:
                print(f"Error generating easy problem {i+1}: {e}")
        
        # Generate medium problems
        for i in range(medium_count):
            try:
                problem = self.generate_problem("medium")
                problem["id"] = f"medium_{i+1}"
                problems.append(problem)
                print(f"Generated medium problem {i+1}/{medium_count}")
            except Exception as e:
                print(f"Error generating medium problem {i+1}: {e}")
        
        # Generate hard problems
        for i in range(hard_count):
            try:
                problem = self.generate_problem("hard")
                problem["id"] = f"hard_{i+1}"
                problems.append(problem)
                print(f"Generated hard problem {i+1}/{hard_count}")
            except Exception as e:
                print(f"Error generating hard problem {i+1}: {e}")
        
        return problems
    
    def save_problems(self, problems: List[Dict[str, Any]], filename: str = "generated_problems.json"):
        """Save problems to JSON file."""
        output_path = os.path.join("generated", filename)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(problems, f, indent=2, ensure_ascii=False)
        
        print(f"Saved {len(problems)} problems to {output_path}")
        return output_path

def main():
    """Generate problems and save to file."""
    try:
        generator = MathProblemGenerator()
        
        print("Starting problem generation...")
        problems = generator.generate_multiple_problems(
            easy_count=5,
            medium_count=5,
            hard_count=5
        )
        
        generator.save_problems(problems)
        print(f"Successfully generated {len(problems)} problems!")
        
        # Display sample
        if problems:
            print("\nSample problem:")
            sample = problems[0]
            print(f"Expression: {sample['expression']}")
            print(f"Correct: {sample['correctAnswer']}")
            print(f"Hint: {sample['hint'][:50]}...")
        
    except Exception as e:
        print(f"Error in main: {e}")
        raise

if __name__ == "__main__":
    main()