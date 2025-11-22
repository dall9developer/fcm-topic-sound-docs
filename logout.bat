@echo off
chcp 65001 >nul
echo ========================================
echo Git 로그아웃 (모든 계정 정보 삭제)
echo ========================================
echo.

echo [1/3] Git 사용자 정보 확인...
echo 현재 Git 사용자:
git config --global user.name
git config --global user.email
echo.

echo [2/3] 저장된 GitHub 인증 정보 삭제 중...
git credential-manager erase https://github.com
git config --global --unset credential.helper
echo ✅ GitHub 인증 정보 삭제 완료
echo.

echo [3/3] Git 사용자 정보 삭제 (선택)
set /p DELETE_USER="Git 사용자 정보도 삭제하시겠습니까? (Y/N): "

if /i "%DELETE_USER%"=="Y" (
    git config --global --unset user.name
    git config --global --unset user.email
    echo ✅ Git 사용자 정보 삭제 완료
) else (
    echo ⏭️ Git 사용자 정보는 유지됩니다
)

echo.
echo ========================================
echo 🎉 로그아웃 완료!
echo ========================================
echo.
echo 다음 Git 작업 시 다시 로그인하게 됩니다.
echo.
pause
