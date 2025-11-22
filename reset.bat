@echo off
chcp 65001 >nul
echo ========================================
echo Git 저장소 초기화 취소
echo ========================================
echo.

cd /d "%~dp0"

echo .git 폴더 삭제 중...
if exist ".git" (
    rmdir /s /q ".git"
    echo ✅ Git 저장소가 삭제되었습니다.
) else (
    echo ⚠️ .git 폴더가 없습니다. 이미 삭제된 상태입니다.
)

echo.
echo ========================================
echo 🎉 초기화 완료!
echo ========================================
echo.
echo 이제 deploy.bat를 다시 실행하세요!
echo.
pause
