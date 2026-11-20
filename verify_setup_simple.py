#!/usr/bin/env python3
"""
MauroMotion Simple Setup Verification
"""

import os
import sys

def check_backend():
    print("\n[Backend] Checking...")
    try:
        import urllib.request
        req = urllib.request.urlopen('http://localhost:8000/health', timeout=5)
        data = req.read().decode('utf-8')
        if 'healthy' in data:
            print("  [OK] Backend is running")
            return True
        else:
            print("  [FAIL] Backend health check failed")
            return False
    except Exception as e:
        print(f"  [FAIL] Cannot connect to backend: {e}")
        return False

def check_venv():
    print("\n[Python] Checking virtual environment...")
    venv_path = "services/engine/venv"
    if os.path.exists(venv_path):
        print(f"  [OK] Virtual environment found")
        return True
    else:
        print(f"  [FAIL] Virtual environment not found")
        return False

def check_frontend():
    print("\n[Frontend] Checking...")
    if os.path.exists('apps/web/package.json'):
        print("  [OK] package.json found")
        return True
    else:
        print("  [FAIL] package.json not found")
        return False

def main():
    print("=" * 50)
    print("MauroMotion Setup Verification")
    print("=" * 50)
    
    results = {
        'Backend': check_backend(),
        'Python': check_venv(),
        'Frontend': check_frontend(),
    }
    
    print("\n" + "=" * 50)
    print("Summary")
    print("=" * 50)
    
    all_passed = True
    for component, passed in results.items():
        status = "[OK]" if passed else "[FAIL]"
        print(f"  {component}: {status}")
        if not passed:
            all_passed = False
    
    if all_passed:
        print("\nAll checks passed!")
        return 0
    else:
        print("\nSome checks failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())