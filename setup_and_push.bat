@echo off
chcp 65001 >nul
echo ========================================
echo Git 완전 초기화 및 배포
echo ========================================
echo.

cd /d "%~dp0"

echo [1/6] 기존 Git 설정 완전 삭제...
if exist ".git" (
    rmdir /s /q ".git"
    echo ✅ 기존 Git 삭제 완료
)
echo.

echo [2/6] Git 사용자 정보 설정...
git config --global user.name "dall9developer"
git config --global user.email "dall9developer@users.noreply.github.com"
echo ✅ Git 사용자 정보 설정 완료
echo.

echo [3/6] Git Credential Manager 설정...
git config --global credential.helper manager-core
echo ✅ 인증 방식 설정 완료
echo.

echo [4/6] Git 초기화 및 커밋...
git init
git add .
git commit -m "FCM Topic 사운드 시스템 기획 문서"
git branch -M main
echo ✅ Git 초기화 완료
echo.

echo [5/6] GitHub 저장소 연결...
git remote add origin https://github.com/dall9developer/fcm-topic-sound-docs.git
echo ✅ 저장소 연결 완료
echo.

echo [6/6] GitHub에 Push...
echo.
echo ⚠️⚠️⚠️ 중요! ⚠️⚠️⚠️
echo.
echo GitHub 로그인 창이 뜨면:
echo 1. "Sign in with your browser" 클릭
echo 2. 브라우저에서 dall9developer 계정으로 로그인
echo 3. "Authorize git-ecosystem" 클릭
echo.
pause

git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo ❌ Push 실패
    echo ========================================
    echo.
    echo 대체 방법: Personal Access Token 사용
    echo.
    echo 1. https://github.com/settings/tokens 접속
    echo 2. "Generate new token (classic)" 클릭
    echo 3. Note: "fcm-docs-upload"
    echo 4. Expiration: 30 days
    echo 5. repo 체크박스 선택
    echo 6. Generate token 클릭
    echo 7. 생성된 토큰 복사
    echo.
    echo 8. 아래 명령어 실행 (토큰 붙여넣기):
    echo    git push https://[토큰]@github.com/dall9developer/fcm-topic-sound-docs.git main
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo 🎉🎉🎉 Push 성공! 🎉🎉🎉
echo ========================================
echo.
echo 다음 단계:
echo 1. https://github.com/dall9developer/fcm-topic-sound-docs 접속
echo 2. Settings 탭 클릭
echo 3. 왼쪽 메뉴 Pages 클릭
echo 4. Source에서 'main' 브랜치 선택
echo 5. Save 클릭
echo.
echo 약 1-2분 후 접속 가능:
echo.
echo 🌐 https://dall9developer.github.io/fcm-topic-sound-docs/
echo.
echo ========================================
pause
