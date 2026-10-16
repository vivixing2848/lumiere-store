#!/usr/bin/env bash
# 本地预览启动脚本
# 用法：双击本文件（macOS/Linux 终端）或运行  bash start.sh

echo ""
echo "  LUMIÈRE 独立站 — 本地预览"
echo "  ================================"
echo ""

# 优先用 python3，其次 python
if command -v python3 >/dev/null 2>&1; then
  PY=python3
elif command -v python >/dev/null 2>&1; then
  PY=python
else
  echo "  ✗ 未检测到 Python。"
  echo "    请先安装 Python：https://www.python.org/downloads/"
  echo "    或直接双击 index.html 预览（部分功能可能受限）。"
  exit 1
fi

PORT=8080

# 端口被占用时自动顺延
while lsof -i :$PORT >/dev/null 2>&1; do
  echo "  端口 $PORT 已被占用，尝试 $((PORT+1)) …"
  PORT=$((PORT+1))
done

echo "  ✓ 服务已启动"
echo ""
echo "  请在浏览器打开：  http://localhost:$PORT"
echo ""
echo "  按 Ctrl + C 停止服务"
echo ""

# 自动打开浏览器（macOS / Linux 可用时）
(sleep 1 && (open "http://localhost:$PORT" 2>/dev/null || xdg-open "http://localhost:$PORT" 2>/dev/null)) &

$PY -m http.server $PORT
