$source = "D:\Github\evosist_parking-1.0.0"
$temp = "$env:TEMP\evopack"
$zip = "$source\project.zip"

# ================================================
# Ambil versi dari file package.json
# ================================================
$pkgPath = Join-Path $source "package.json"

if (Test-Path $pkgPath) {
    try {
        $pkgContent = Get-Content -Path $pkgPath -Raw | ConvertFrom-Json
        $versionCode = $pkgContent.version
        Write-Host "[INFO] Version from package.json: $versionCode"
    } catch {
        Write-Error "[ERROR] Gagal membaca atau mengonversi package.json: $_"
        exit 1
    }
} else {
    Write-Error "[ERROR] package.json tidak ditemukan di: $pkgPath"
    exit 1
}


# ================================================
# Bersihkan folder sementara
# ================================================
Remove-Item -Recurse -Force $temp -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $temp | Out-Null

# ================================================
# Salin isi proyek (kecuali folder tertentu dan 2 file .exe)
# ================================================
robocopy $source $temp /E `
  /XD `
    "$source\electron" `
    "$source\.git" `
    "$source\node_modules" `
    "$source\dist\win-unpacked\resources\node_modules" `
    "$source\dist\win-unpacked\resources\app\.next" `
    "$source\.next\cache" `
    "$source\dist\win-unpacked\resources\app\.next\cache" `
    "$source\dist\win-unpacked\resources\.next\cache" `
  /XF `
    "$source\dist\win-unpacked\Evosist Parking Desktop.exe" `
    "$source\dist\Evosist Parking Desktop ${versionCode}.exe" `
    "$source\dist\win-unpacked\resources\node.exe" `
    "$source\dist\win-unpacked\resources\app\electron\node.exe" `
    "$source\dist\win-unpacked\resources\app\electron\assets\node.exe"

# ================================================
# Salin hanya dua file .vbs dari folder electron
# ================================================
$electronTarget = Join-Path $temp "electron"
New-Item -ItemType Directory -Path $electronTarget -Force | Out-Null
Copy-Item "$source\electron\createShortcutDesktop.vbs" -Destination $electronTarget -Force
Copy-Item "$source\electron\createShortcutStartMenu.vbs" -Destination $electronTarget -Force


# ================================================
# Salin folder electron/update ke dalam temp
# ================================================
$updateSource = Join-Path $source "electron\update"
$updateTarget = Join-Path $temp "electron\update"
# Copy-Item $updateSource -Destination $updateTarget -Recurse -Force
if (Test-Path $updateSource) {
    Copy-Item $updateSource -Destination $updateTarget -Recurse -Force
    Write-Host "[SCCESS] ================================================ Folder update disalin. ================================================"
} else {
    Write-Warning "[WARNING] ================================================Folder electron/update tidak ditemukan, dilewati. ================================================"
}

# ================================================
# Hapus package.json di root temp
# ================================================
$rootPackage = Join-Path $temp "package.json"
if (Test-Path $rootPackage) {
    Remove-Item $rootPackage -Force
    Write-Host "[DELLETE] package.json di root temp dihapus sebelum kompresi"
}

# ================================================
# Buat ZIP
# ================================================
Compress-Archive -Path "$temp\*" -DestinationPath $zip -Force

# ================================================
# Hapus folder sementara
# ================================================
Remove-Item -Recurse -Force $temp

Write-Host "[DONE] [SUCCESS] ZIP selesai dibuat: $zip"

# ================================================
# Pindahkan ZIP ke folder rilis
# ================================================
$rilisFolder = "D:\Github\rilis_ep"
$targetZip = Join-Path $rilisFolder "project.zip"

if (-Not (Test-Path $rilisFolder)) {
    New-Item -ItemType Directory -Path $rilisFolder -Force | Out-Null
    Write-Host "[INFO] Folder rilis_ep dibuat: $rilisFolder"
}

if (Test-Path $targetZip) {
    Remove-Item $targetZip -Force
    Write-Host "[INFO] File project.zip lama dihapus dari folder rilis"
}

Move-Item -Path $zip -Destination $targetZip -Force
Write-Host "[DONE] [SUCCESS] ZIP dipindahkan ke: $targetZip"

# ================================================
# Tanyakan apakah ingin commit ke GitHub
# ================================================
$response = Read-Host "Apakah Anda ingin mempublikasikan ke GitHub? (Y/YA)"

if ($response -in @("Y", "YA", "ya", "Ya")) {
    Set-Location $rilisFolder
    git add . 
    git commit -m "UPDATE: project.zip rilis versi $versionCode"
    git push
    Write-Host "[PUBLISH] Berhasil dipublikasikan ke GitHub."
} else {
    Write-Host "[SKIP] Tidak dipublikasikan ke GitHub."
}

# ================================================
# Selesai
# ================================================
Write-Host "`n==========================================================="
Write-Host "[FINISH] Proses Selesai!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
Write-Host "==========================================================="