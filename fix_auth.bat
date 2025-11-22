@echo off
chcp 65001 >nul
echo ========================================
echo Git 계정 인증 초기화
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] 기존 Git 인증 정보 삭제 중...
git config --global --unset credential.helper
git credential-manager erase https://github.com
echo ✅ 기존 인증 정보 삭제 완료
echo.

echo [2/2] GitHub에 Push 재시도...
echo.
echo ⚠️ GitHub 로그인 창이 뜨면:
echo    1. dall9developer 계정으로 로그인
echo    2. 권한 승인
echo.
pause

git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo ❌ Push 실패
    echo ========================================
    echo.
    echo 수동 해결 방법:
    echo.
    echo 1. Windows 자격 증명 관리자 열기
    echo    - 시작 메뉴 → "자격 증명 관리자" 검색
    echo.
    echo 2. "Windows 자격 증명" 클릭
    echo.
    echo 3. "git:https://github.com" 항목 찾아서 삭제
    echo.
    echo 4. 이 스크립트 다시 실행
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo 🎉 Push 성공!
echo ========================================
echo.
echo 다음 단계:
echo 1. https://github.com/dall9developer/fcm-topic-sound-docs 접속
echo 2. Settings → Pages
echo 3. Source에서 'main' 브랜치 선택
echo 4. Save 클릭
echo.
echo 약 1-2분 후 접속:
echo 👉 https://dall9developer.github.io/fcm-topic-sound-docs/
echo.
pause
