!include "MUI2.nsh"
!define APPNAME "EvoPark"
!define APPDIR "$PROGRAMFILES64\EvoPark"

SetCompressor /SOLID lzma

Name "${APPNAME} Installer"
OutFile "EvoParkInstaller.exe"
InstallDir "${APPDIR}"
# Icon "installer-assets\evo.ico"
Icon "${__FILEDIR__}\installer-assets\evo.ico"
UninstallIcon "${__FILEDIR__}\installer-assets\evo.ico"

InstallDirRegKey HKCU "Software\EvoPark" "InstallPath"
RequestExecutionLevel admin

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_LANGUAGE "English"


Section "Install"

  SetOutPath "$INSTDIR"
  File /r "src\setup.ps1"

  # Progress Step 1
  DetailPrint "🚀 Menyiapkan direktori unduhan..."
  Sleep 300
  DetailPrint "📥 Mengunduh dan mengekstrak project.zip..."
  Sleep 600

  # Progress Step 2
  DetailPrint "🧩 Tandai local storage RawProject..."
  Sleep 300

  # Progress Step 3
  DetailPrint "📦 Mengunduh dan mengekstrak npm.zip..."
  Sleep 700

  # Progress Step 4
  DetailPrint "⚙️ Menjalankan npm install..."
  Sleep 600

  # Progress Step 5
  DetailPrint "🔁 Menyalin node_modules ke resources..."
  Sleep 500

  # Progress Step 6
  DetailPrint "📄 Menandai node_modules sebagai lokal..."
  Sleep 300

  # Progress Step 8
  DetailPrint "📡 Mengunduh MainApp.exe dengan retry..."
  Sleep 700

  # Progress Step 9
  DetailPrint "🖥️ Membuat shortcut di desktop..."
  Sleep 400

  # Jalankan setup.ps1
  DetailPrint "🚨 Menjalankan PowerShell setup.ps1..."
  ExecWait 'powershell -ExecutionPolicy Bypass -NoProfile -File "$INSTDIR\setup.ps1"'

  DetailPrint "✅ Instalasi selesai!"

  WriteUninstaller "$INSTDIR\Uninstall.exe"
SectionEnd


Section "Uninstall"
  Delete "$INSTDIR\setup.ps1"
  Delete "$INSTDIR\Uninstall.exe"
  RMDir /r "$INSTDIR"
  DeleteRegKey HKCU "Software\EvoPark"
SectionEnd
