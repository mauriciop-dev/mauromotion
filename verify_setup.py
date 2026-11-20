#!/usr/bin/env python3
"""
MauroMotion Setup Verification Script
Run this to verify your development environment is properly configured
"""

import subprocess
import sys
import os

def check_backend():
    """Check if backend is running"""
    print("\n🔍 Checking Backend...")
    try:
        import urllib.request
        req = urllib.request.urlopen('http://localhost:8000/health', timeout=5)
        data = req.read().decode('utf-8')
        if 'healthy' in data:
            print("   ✅ Backend is running and healthy")
            return True
        else:
            print("   ❌ Backend health check failed")
            return False
    except Exception as e:
        print(f"   ❌ Cannot connect to backend: {e}")
        return False

def check_venv():
    """Check if Python virtual environment exists"""
    print("\n🐍 Checking Python Environment...")
    venv_path = "services/engine/venv"
    if os.path.exists(venv_path):
        print(f"   ✅ Virtual environment found at {venv_path}")
        
        # Check key packages
        packages = ['fastapi', 'torch', 'whisperx', 'mediapipe']
        for pkg in packages:
            try:
                __import__(pkg)
                print(f"   ✅ {pkg} installed")
            except ImportError:
                print(f"   ⚠️  {pkg} not installed (run: pip install {pkg})")
        return True
    else:
        print(f"   ❌ Virtual environment not found at {venv_path}")
        return False

def check_frontend():
    """Check if frontend dependencies exist"""
    print("\n⚛️ Checking Frontend...")
    
    # Check package.json
    if os.path.exists('apps/web/package.json'):
        print("   ✅ package.json found")
    else:
        print("   ❌ package.json not found")
        return False
    
    # Check node_modules
    if os.path.exists('apps/web/node_modules'):
        print("   ✅ node_modules found")
    else:
        print("   ⚠️  node_modules not found (run: pnpm install)")
    
    return True

def check_insforge():
    """Check InsForge configuration"""
    print("\n🗄️ Checking InsForge...")
    
    env_file = '.env.local'
    if os.path.exists(env_file):
        with open(env_file, 'r') as f:
            content = f.read()
            if 'INSFORGE_URL' in content:
                print("   ✅ INSFORGE_URL configured")
            else:
                print("   ⚠️  INSFORGE_URL not set in .env.local")
    else:
        print("   ⚠️  .env.local not found (copy from .env.example)")
    
    return True

def main():
    print("=" * 60)
    print("MauroMotion Setup Verification")
    print("=" * 60)
    
    results = {
        'Backend': check_backend(),
        'Python': check_venv(),
        'Frontend': check_frontend(),
        'InsForge': check_insforge(),
    }
    
    print("\n" + "=" * 60)
    print("Summary")
    print("=" * 60)
    
    all_passed = True
    for component, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"  {component}: {status}")
        if not passed:
            all_passed = False
    
    if all_passed:
        print("\n🎉 All checks passed! You're ready to develop.")
        print("\n📝 Quick commands:")
        print("   Backend:  cd services/engine && .\\venv\\Scripts\\python.exe -m uvicorn main:app --reload")
        print("   Frontend: cd apps/web && pnpm dev")
        return 0
    else:
        print("\n⚠️  Some checks failed. Please review the output above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())