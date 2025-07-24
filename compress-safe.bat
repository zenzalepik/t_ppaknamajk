@echo off
setlocal enabledelayedexpansion

echo === Mulai Kompresi UPX ===

set HAS_ERROR=0

for %%F in (dist\*.exe dist\win-unpacked\*.exe) do (
  echo Mengompres: %%F
  upx --best --lzma "%%F"
  if errorlevel 1 (
    echo ⚠️  [SKIP] %%F tidak kompatibel dengan UPX
    set HAS_ERROR=1
  )
)

echo === Kompresi Selesai ===

exit /b 0
