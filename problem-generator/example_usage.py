#!/usr/bin/env python3
"""
Example usage of the problem generator.
Shows how to generate different types of problems and export them.
"""

import json
import os
from problem_generator import MathProblemGenerator
from export_to_ts import TypeScriptExporter

def demo_single_problem():
    """Generate and display a single problem."""
    print("🔢 Generating a single medium problem...")
    
    try:
        generator = MathProblemGenerator()
        problem = generator.generate_problem("medium")
        
        print(f"Expression: {problem['expression']}")
        print(f"Correct Answer: {problem['correctAnswer']}")
        print(f"Wrong Answers: {problem['wrongAnswers']}")
        print(f"Finnish Hint: {problem['hint'][:80]}...")
        print(f"Final Form: {problem['explanation']['finalSimplification']}")
        
        return problem
        
    except Exception as e:
        print(f"❌ Error generating single problem: {e}")
        return None

def demo_batch_generation():
    """Generate a batch of problems."""
    print("\n📚 Generating batch of problems...")
    
    try:
        generator = MathProblemGenerator()
        problems = generator.generate_multiple_problems(
            easy_count=2,
            medium_count=2,
            hard_count=1
        )
        
        print(f"Generated {len(problems)} problems:")
        for problem in problems:
            difficulty = problem['difficulty']
            expression = problem['expression']
            print(f"  [{difficulty.upper()}] {expression}")
        
        # Save to JSON
        output_file = generator.save_problems(problems, "demo_problems.json")
        return problems, output_file
        
    except Exception as e:
        print(f"❌ Error in batch generation: {e}")
        return [], None

def demo_typescript_export(json_file):
    """Demonstrate TypeScript export."""
    print("\n📝 Exporting to TypeScript...")
    
    try:
        exporter = TypeScriptExporter()
        ts_file = exporter.export_to_typescript(
            json_file, 
            "demo_output.ts"
        )
        
        # Show a snippet of the generated TypeScript
        if os.path.exists(ts_file):
            with open(ts_file, 'r') as f:
                content = f.read()
                lines = content.split('\n')
                print("Generated TypeScript (first 20 lines):")
                for i, line in enumerate(lines[:20]):
                    print(f"  {i+1:2d}: {line}")
                if len(lines) > 20:
                    print(f"  ... and {len(lines)-20} more lines")
        
        return ts_file
        
    except Exception as e:
        print(f"❌ Error in TypeScript export: {e}")
        return None

def analyze_problem_quality(problems):
    """Analyze the quality and variety of generated problems."""
    print("\n📊 Analyzing problem quality...")
    
    difficulties = {}
    expressions = []
    
    for problem in problems:
        difficulty = problem.get('difficulty', 'unknown')
        difficulties[difficulty] = difficulties.get(difficulty, 0) + 1
        expressions.append(problem.get('expression', ''))
    
    print("Difficulty distribution:")
    for diff, count in difficulties.items():
        print(f"  {diff}: {count} problems")
    
    print("\nExpression variety:")
    for expr in expressions:
        print(f"  {expr}")
    
    # Check for Finnish content
    finnish_hints = sum(1 for p in problems if 'FOIL' in p.get('hint', ''))
    print(f"\nFinnish hints with FOIL method: {finnish_hints}/{len(problems)}")

def main():
    """Run the complete demo."""
    print("🎯 Problem Generator Demo")
    print("=" * 50)
    
    # Check if API key is configured
    from dotenv import load_dotenv
    load_dotenv()
    
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key or api_key == 'your_google_api_key_here':
        print("❌ Google API key not configured.")
        print("Please set GOOGLE_API_KEY in your .env file first.")
        return
    
    # Demo 1: Single problem
    single_problem = demo_single_problem()
    
    # Demo 2: Batch generation
    problems, json_file = demo_batch_generation()
    
    if problems and json_file:
        # Demo 3: TypeScript export
        ts_file = demo_typescript_export(json_file)
        
        # Demo 4: Quality analysis
        analyze_problem_quality(problems)
        
        print("\n" + "=" * 50)
        print("✅ Demo completed successfully!")
        print(f"📁 Generated files:")
        print(f"   JSON: {json_file}")
        if ts_file:
            print(f"   TypeScript: {ts_file}")
    else:
        print("❌ Demo failed during problem generation")

if __name__ == "__main__":
    main()