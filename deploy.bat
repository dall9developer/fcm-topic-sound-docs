@echo off
chcp 65001 >nul
echo ========================================
echo GitHub Pages 자동 배포 스크립트
echo ========================================
echo.

REM 현재 디렉토리로 이동
cd /d "%~dp0"

echo [1/5] Git 초기화 중...
git init
if errorlevel 1 (
    echo ❌ Git 초기화 실패
    echo Git이 설치되어 있는지 확인하세요: https://git-scm.com/
    pause
    exit /b 1
)
echo ✅ Git 초기화 완료
echo.

echo [2/5] 파일 추가 중...
git add .
git commit -m "FCM Topic 사운드 시스템 기획 문서"
echo ✅ 파일 추가 완료
echo.

echo [3/5] GitHub 저장소 연결
echo.
echo ⚠️ 먼저 GitHub에서 새 저장소를 생성하세요!
echo    1. https://github.com/new 접속
echo    2. Repository name: fcm-topic-sound-docs
echo    3. Public으로 설정
echo    4. Create repository 클릭
echo.
set /p GITHUB_USERNAME="GitHub 사용자명 입력: "
echo.

git remote add origin https://github.com/%GITHUB_USERNAME%/fcm-topic-sound-docs.git
git branch -M main
echo ✅ 저장소 연결 완료
echo.

echo [4/5] GitHub에 Push 중...
echo.
echo ⚠️ GitHub 로그인 창이 뜨면 로그인하세요!
echo.
git push -u origin main
if errorlevel 1 (
    echo.
    echo ❌ Push 실패
    echo.
    echo 문제 해결:
    echo 1. GitHub 로그인 확인
    echo 2. 저장소 이름이 정확한지 확인
    echo 3. 저장소가 이미 존재하는지 확인
    pause
    exit /b 1
)
echo ✅ Push 완료
echo.

echo [5/5] GitHub Pages 설정 안내
echo.
echo ========================================
echo 🎉 파일 업로드 완료!
echo ========================================
echo.
echo 다음 단계:
echo 1. https://github.com/%GITHUB_USERNAME%/fcm-topic-sound-docs 접속
echo 2. Settings 탭 클릭
echo 3. 왼쪽 메뉴에서 Pages 클릭
echo 4. Source에서 'main' 브랜치 선택
echo 5. Save 클릭
echo.
echo 약 1-2분 후 접속 가능:
echo 👉 https://%GITHUB_USERNAME%.github.io/fcm-topic-sound-docs/
echo.
echo ========================================
pause
