#!/usr/bin/env python3
"""
MauroMotion Backend - Setup script
Run this once to set up the Python environment for the backend engine
"""

import subprocess
import sys
import os

def install_dependencies():
    """Install Python dependencies for the MauroMotion engine"""
    requirements = '''
fastapi==0.115.0
uvicorn[standard]==0.30.0
pydantic==2.9.0
python-multipart==0.0.9
'''

    print("Setting up MauroMotion Backend...")
    print("-" * 40)
    
    # Create virtual environment if it doesn't exist
    venv_path = os.path.join(os.path.dirname(__file__), 'venv')
    if not os.path.exists(venv_path):
        print("Creating virtual environment...")
        subprocess.run([sys.executable, '-m', 'venv', venv_path])
    
    # Install dependencies
    pip = os.path.join(venv_path, 'Scripts', 'pip') if os.name == 'nt' else os.path.join(venv_path, 'bin', 'pip')
    
    print("Installing dependencies...")
    subprocess.run([pip, 'install', '--upgrade', 'pip'])
    subprocess.run([pip, 'install'] + requirements.strip().split('\n'))
    
    print("-" * 40)
    print("Setup complete!")
    print(f"Activate with: {os.path.join(venv_path, 'Scripts', 'activate') if os.name == 'nt' else os.path.join(venv_path, 'bin', 'activate')}")

if __name__ == "__main__":
    install_dependencies()