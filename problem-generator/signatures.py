import dspy
from typing import List

class BinomialProblemGenerator(dspy.Signature):
    """Generate a binomial expansion problem with Finnish hints and explanations."""
    
    difficulty: str = dspy.InputField(desc="Difficulty level: easy, medium, or hard")
    problem_count: int = dspy.InputField(desc="Number of problems to generate")
    
    expression: str = dspy.OutputField(desc="Binomial expression like '(3x - 1)(2x + 4)'")
    correct_answer: str = dspy.OutputField(desc="Expanded form before simplification like '6x² + 12x - 2x - 4'")
    wrong_answer_1: str = dspy.OutputField(desc="Plausible wrong answer representing common mistake")
    wrong_answer_2: str = dspy.OutputField(desc="Another plausible wrong answer representing different mistake")
    finnish_hint: str = dspy.OutputField(desc="Finnish language hint explaining FOIL method for this problem")
    term1_1: str = dspy.OutputField(desc="First term from first binomial for FOIL step 1")
    term1_2: str = dspy.OutputField(desc="First term from second binomial for FOIL step 1")
    result1: str = dspy.OutputField(desc="Result of multiplying first terms")
    term2_1: str = dspy.OutputField(desc="First term from first binomial for FOIL step 2")
    term2_2: str = dspy.OutputField(desc="Second term from second binomial for FOIL step 2")
    result2: str = dspy.OutputField(desc="Result of multiplying outer terms")
    term3_1: str = dspy.OutputField(desc="Second term from first binomial for FOIL step 3")
    term3_2: str = dspy.OutputField(desc="First term from second binomial for FOIL step 3")
    result3: str = dspy.OutputField(desc="Result of multiplying inner terms")
    term4_1: str = dspy.OutputField(desc="Second term from first binomial for FOIL step 4")
    term4_2: str = dspy.OutputField(desc="Second term from second binomial for FOIL step 4")
    result4: str = dspy.OutputField(desc="Result of multiplying last terms")
    final_simplified: str = dspy.OutputField(desc="Final simplified form after combining like terms")

class ProblemRefinement(dspy.Signature):
    """Refine and validate a generated binomial problem for mathematical accuracy."""
    
    expression: str = dspy.InputField(desc="Original binomial expression")
    correct_answer: str = dspy.InputField(desc="Proposed correct answer")
    wrong_answers: str = dspy.InputField(desc="Proposed wrong answers")
    
    is_valid: str = dspy.OutputField(desc="YES or NO - is the math correct?")
    corrected_answer: str = dspy.OutputField(desc="Mathematically correct expanded form")
    improved_wrong_answers: str = dspy.OutputField(desc="Two realistic wrong answers separated by |")