@echo off
chcp 65001 >nul
title LUMIERE 独立站 - 本地预览

echo.
echo   LUMIERE 独立站 — 本地预览
echo   ================================
echo.

where python >nul 2>nul
if %errorlevel%==0 (
  set PY=python
) else (
  where py >nul 2>nul
  if %errorlevel%==0 (
    set PY=py
  ) else (
    echo   [X] 未检测到 Python。
    echo       请先安装：https://www.python.org/downloads/
    echo       安装时务必勾选 "Add Python to PATH"
    echo.
    echo       或直接双击 index.html 预览。
    pause
    exit /b 1
  )
)

echo   [√] 服务已启动
echo.
echo   请在浏览器打开：  http://localhost:8080
echo.
echo   关闭本窗口即可停止服务
echo.

start "" http://localhost:8080
%PY% -m http.server 8080
pause
