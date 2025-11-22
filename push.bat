@echo off
chcp 65001 >nul
echo ========================================
echo GitHub Push 재시도
echo ========================================
echo.

cd /d "%~dp0"

echo GitHub에 Push 중...
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ Push 실패
    echo.
    echo GitHub 저장소를 먼저 생성했는지 확인하세요:
    echo https://github.com/new
    echo.
    echo Repository name: fcm-topic-sound-docs
    echo Public으로 설정
    pause
    exit /b 1
)

echo.
echo ========================================
echo 🎉 Push 완료!
echo ========================================
echo.
echo 다음 단계:
echo 1. https://github.com/dall9developer/fcm-topic-sound-docs 접속
echo 2. Settings 탭 클릭
echo 3. 왼쪽 메뉴에서 Pages 클릭
echo 4. Source에서 'main' 브랜치 선택
echo 5. Save 클릭
echo.
echo 약 1-2분 후 접속 가능:
echo 👉 https://dall9developer.github.io/fcm-topic-sound-docs/
echo.
echo ========================================
pause
