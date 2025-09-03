#!/usr/bin/env python3
"""
Setup script for the problem generator.
This script helps set up the environment and test basic functionality.
"""

import os
import subprocess
import sys

def install_dependencies():
    """Install required Python packages."""
    print("Installing Python dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def check_env_file():
    """Check if .env file exists and has required variables."""
    env_file = ".env"
    example_file = ".env.example"
    
    if not os.path.exists(env_file):
        if os.path.exists(example_file):
            print(f"⚠️  {env_file} not found. Please copy {example_file} to {env_file} and add your Google API key.")
            return False
        else:
            print(f"❌ Neither {env_file} nor {example_file} found.")
            return False
    
    # Check if API key is set
    try:
        from dotenv import load_dotenv
        load_dotenv()
        
        api_key = os.getenv('GOOGLE_API_KEY')
        if not api_key or api_key == 'your_google_api_key_here':
            print("⚠️  GOOGLE_API_KEY not set in .env file. Please add your Google API key.")
            return False
        
        print("✅ Environment configuration looks good!")
        return True
        
    except ImportError:
        print("⚠️  python-dotenv not installed yet. Run setup first.")
        return False

def test_basic_functionality():
    """Test basic DSPy functionality without making API calls."""
    print("Testing basic functionality...")
    try:
        # Test imports
        import dspy
        from signatures import BinomialProblemGenerator, ProblemRefinement
        print("✅ All imports successful!")
        
        # Test data structures
        from export_to_ts import JSONExporter
        exporter = JSONExporter()
        print("✅ JSON exporter initialized!")
        
        return True
        
    except Exception as e:
        print(f"❌ Basic functionality test failed: {e}")
        return False

def main():
    """Main setup process."""
    print("🚀 Setting up Problem Generator...")
    print("=" * 50)
    
    # Step 1: Install dependencies
    if not install_dependencies():
        print("❌ Setup failed at dependency installation")
        return
    
    # Step 2: Test basic functionality
    if not test_basic_functionality():
        print("❌ Setup failed at functionality test")
        return
    
    # Step 3: Check environment
    env_ready = check_env_file()
    
    print("\n" + "=" * 50)
    if env_ready:
        print("✅ Setup complete! You can now run:")
        print("   python problem_generator.py  # Generate problems")
        print("   python export_to_ts.py       # Export to TypeScript")
    else:
        print("⚠️  Setup mostly complete, but please configure your .env file first.")
        print("   1. Copy .env.example to .env")
        print("   2. Add your Google API key")
        print("   3. Run: python problem_generator.py")

if __name__ == "__main__":
    main()