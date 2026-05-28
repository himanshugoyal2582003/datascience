@echo off
REM Merge script for crypto folder setup worktree
REM This script commits changes in the topic branch and merges to main

setlocal enabledelayedexpansion

echo.
echo ========================================
echo MERGING CRYPTO FOLDER SETUP TO MAIN
echo ========================================
echo.

REM Step 1: Check for uncommitted changes in the current worktree
echo [1/4] Checking for uncommitted changes...
cd /d "e:\datascience.worktrees\agents-crypto-folder-setup-with-gitignore"
git status --porcelain
echo.

REM Step 2: Commit changes
echo [2/4] Committing changes...
git commit -m "docs: Add comprehensive GitHub setup documentation and security configuration

- Added GITHUB_READY.md and SETUP_COMPLETE.md checklists
- Created PROJECT_STRUCTURE.md navigation and organization guide
- Added aml/GETTING_STARTED.md quick start guide (5-minute setup)
- Added aml/ARCHITECTURE.md technical design and data flow documentation
- Added aml/python-analysis/README.md script documentation
- Enhanced .gitignore with comprehensive file patterns for data privacy
- Added requirements.txt with all Python dependencies
- Added CONTRIBUTING.md contribution guidelines and code standards
- Added LICENSE (MIT) for legal framework
- Configured repository for secure GitHub upload with proper data exclusion

Repository is now GitHub-ready with complete documentation, security configuration, and contribution guidelines.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

if errorlevel 1 (
    echo [!] Nothing to commit or commit failed
) else (
    echo [+] Commit successful
)
echo.

REM Step 3: Merge to main branch
echo [3/4] Merging to main branch...
cd /d "E:\datascience"
git merge "agents/crypto-folder-setup-with-gitignore"

if errorlevel 1 (
    echo [!] Merge failed - check for conflicts
    exit /b 1
) else (
    echo [+] Merge successful
)
echo.

REM Step 4: Verify merge
echo [4/4] Verifying merge...
echo Latest commits:
git log --oneline -5
echo.
echo Status:
git status
echo.

echo ========================================
echo MERGE COMPLETED SUCCESSFULLY
echo ========================================
echo.
