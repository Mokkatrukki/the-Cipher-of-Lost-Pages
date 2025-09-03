import json
import os
from typing import List, Dict, Any

class JSONExporter:
    def __init__(self):
        pass
    
    def clean_problem_data(self, problem: Dict[str, Any]) -> Dict[str, Any]:
        """Clean and validate problem data for JSON export."""
        
        # Ensure wrong answers are valid
        wrong_answers = []
        for answer in problem.get('wrongAnswers', []):
            if isinstance(answer, str) and answer.strip():
                wrong_answers.append(answer.strip())
        
        # Ensure we have exactly 2 wrong answers
        while len(wrong_answers) < 2:
            wrong_answers.append("Invalid answer")
        wrong_answers = wrong_answers[:2]  # Take only first 2
        
        # Clean explanation steps
        steps = []
        for step in problem.get('explanation', {}).get('steps', []):
            clean_step = {
                "term1": step.get('term1', ''),
                "term2": step.get('term2', ''),
                "result": step.get('result', ''),
                "color": step.get('color', 'yellow'),
                "position": step.get('position', 1)
            }
            steps.append(clean_step)
        
        # Build clean problem object
        clean_problem = {
            "id": problem.get('id', 'generated'),
            "difficulty": problem.get('difficulty', 'medium'),
            "expression": problem.get('expression', ''),
            "correctAnswer": problem.get('correctAnswer', ''),
            "wrongAnswers": wrong_answers,
            "hint": problem.get('hint', ''),
            "explanation": {
                "steps": steps,
                "finalSimplification": problem.get('explanation', {}).get('finalSimplification', '')
            }
        }
        
        return clean_problem
    
    def export_to_json(self, input_file: str = "generated/generated_problems.json", 
                      output_file: str = "../src/data/generated_problems.json") -> str:
        """Convert and clean generated problems to final JSON format."""
        
        # Load problems from JSON
        if not os.path.exists(input_file):
            raise FileNotFoundError(f"Input file {input_file} not found")
        
        with open(input_file, 'r', encoding='utf-8') as f:
            problems = json.load(f)
        
        if not problems:
            raise ValueError("No problems found in input file")
        
        # Clean and validate problems
        clean_problems = []
        difficulty_counts = {"easy": 0, "medium": 0, "hard": 0}
        
        for problem in problems:
            try:
                clean_problem = self.clean_problem_data(problem)
                clean_problems.append(clean_problem)
                
                # Count difficulties
                difficulty = clean_problem.get('difficulty', 'medium')
                if difficulty in difficulty_counts:
                    difficulty_counts[difficulty] += 1
                    
            except Exception as e:
                print(f"Error cleaning problem {problem.get('id', 'unknown')}: {e}")
                continue
        
        # Write to output file
        output_path = os.path.join(os.path.dirname(__file__), output_file)
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(clean_problems, f, indent=2, ensure_ascii=False)
        
        print(f"Exported {len(clean_problems)} problems to {output_path}")
        print(f"Difficulty distribution: {difficulty_counts['easy']} easy, {difficulty_counts['medium']} medium, {difficulty_counts['hard']} hard")
        return output_path
    
    def merge_with_existing(self, generated_file: str, existing_file: str, output_file: str):
        """Merge generated problems with existing problems JSON file."""
        
        # Read existing problems
        existing_problems = []
        if os.path.exists(existing_file):
            print(f"Reading existing problems from {existing_file}")
            try:
                with open(existing_file, 'r', encoding='utf-8') as f:
                    existing_problems = json.load(f)
            except Exception as e:
                print(f"Error reading existing problems: {e}")
        
        # Read generated problems
        generated_problems = []
        if os.path.exists(generated_file):
            with open(generated_file, 'r', encoding='utf-8') as f:
                raw_problems = json.load(f)
                # Clean generated problems
                for problem in raw_problems:
                    generated_problems.append(self.clean_problem_data(problem))
        
        # Merge problems (existing + generated)
        all_problems = existing_problems + generated_problems
        
        # Write merged file
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_problems, f, indent=2, ensure_ascii=False)
        
        print(f"Merged {len(existing_problems)} existing + {len(generated_problems)} generated = {len(all_problems)} total problems")
        return output_file

def main():
    """Export and merge problems to JSON."""
    try:
        exporter = JSONExporter()
        
        # Check if generated problems exist
        input_file = "generated/generated_problems.json"
        if not os.path.exists(input_file):
            print(f"No generated problems found at {input_file}")
            print("Run problem_generator.py first to generate problems")
            return
        
        # Option 1: Export generated problems to separate file
        generated_output = exporter.export_to_json()
        print(f"✅ Generated problems exported to: {generated_output}")
        
        # Option 2: Merge with existing problems
        existing_file = "../src/data/problems.json"
        merged_output = "../src/data/all_problems.json"
        merged_path = exporter.merge_with_existing(input_file, existing_file, merged_output)
        print(f"✅ Merged problems saved to: {merged_path}")
        
        print("\n📁 Available files:")
        print(f"  - Original: {existing_file} (5 problems)")
        print(f"  - Generated: {generated_output} (15 problems)")  
        print(f"  - All combined: {merged_output} (20 problems)")
        
    except Exception as e:
        print(f"Export error: {e}")
        raise

if __name__ == "__main__":
    main()