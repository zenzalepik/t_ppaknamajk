#D:\Github\evosist_parking-1.0.0\electron\update\updateApp.ps1

# Konfigurasi
$downloadNextUrl = "https://github.com/zenzalepik/rilis_ep/raw/main/.next.zip"
$downloadPublicUrl = "https://github.com/zenzalepik/rilis_ep/raw/main/public.zip"
$targetNextDir = "C:\EvoPark\dist\win-unpacked\resources"
$targetPublicDir = "C:\EvoPark\dist\win-unpacked\resources"
$nextDir = Join-Path $targetNextDir ".next"
$publicDir = Join-Path $targetPublicDir "public"
$tempNextZip = "$env:TEMP\.next.zip"
$tempPublicZip = "$env:TEMP\public.zip"
$tempNextExtract = "$env:TEMP\next_extracted"
$tempPublicExtract = "$env:TEMP\public_extracted"

# Nonaktifkan progress bar
$ProgressPreference = 'SilentlyContinue'

#
#
#
#============================================
#======== UPDATE DIREKTORI .NEXT ============
#============================================
#

# Tampilkan lokasi tujuan ekstrak
Write-Host "[INFO] Folder tujuan ekstrak: $nextDir"

# Download ZIP
Write-Host "[INFO] Mengunduh update..."
Invoke-WebRequest -Uri $downloadNextUrl -OutFile $tempNextZip -UseBasicParsing

# Hapus folder .next lama jika ada
if (Test-Path $nextDir) {
  Write-Host "[CLEAN] Menghapus folder .next lama..."
  Remove-Item $nextDir -Recurse -Force
}

# Ekstrak ZIP ke folder sementara
Write-Host "[INFO] Mengekstrak file ZIP ke folder sementara..."
Expand-Archive -Path $tempNextZip -DestinationPath $tempNextExtract -Force

# Buat folder .next baru
Write-Host "[INFO] Membuat folder .next baru di lokasi tujuan..."
New-Item -ItemType Directory -Force -Path $nextDir | Out-Null

# Salin isi hasil ekstrak ke dalam folder .next
Write-Host "[INFO] Menyalin isi file ke folder .next..."
Get-ChildItem -Path $tempNextExtract -Recurse | ForEach-Object {
    $targetPath = $_.FullName.Replace($tempNextExtract, $nextDir)
    if ($_.PSIsContainer) {
        if (!(Test-Path $targetPath)) {
            New-Item -Path $targetPath -ItemType Directory | Out-Null
        }
    } else {
        Copy-Item -Path $_.FullName -Destination $targetPath -Force
    }
}

# ✅ Cetak lokasi akhir
Write-Host "[DONE] File berhasil disalin ke: $nextDir"

# Bersih-bersih
Write-Host "[CLEAN] Menghapus file sementara..."
Remove-Item $tempNextZip -Force
Remove-Item $tempNextExtract -Recurse -Force

#
#
#
#============================================
#======== UPDATE DIREKTORI PUBLIC ===========
#============================================
#
# Tampilkan lokasi tujuan ekstrak
Write-Host "[INFO] Folder tujuan ekstrak: $publicDir"

# Download ZIP
Write-Host "[INFO] Mengunduh update..."
Invoke-WebRequest -Uri $downloadPublicUrl -OutFile $tempPublicZip -UseBasicParsing

# Hapus folder public lama jika ada
if (Test-Path $publicDir) {
  Write-Host "[CLEAN] Menghapus folder public lama..."
  Remove-Item $publicDir -Recurse -Force
}

# Ekstrak ZIP ke folder sementara
Write-Host "[INFO] Mengekstrak file ZIP ke folder sementara..."
Expand-Archive -Path $tempPublicZip -DestinationPath $tempPublicExtract -Force

# Buat folder public baru
Write-Host "[INFO] Membuat folder public baru di lokasi tujuan..."
New-Item -ItemType Directory -Force -Path $publicDir | Out-Null

# Salin isi hasil ekstrak ke dalam folder public
Write-Host "[INFO] Menyalin isi file ke folder public..."
Get-ChildItem -Path $tempPublicExtract -Recurse | ForEach-Object {
    $targetPath = $_.FullName.Replace($tempPublicExtract, $publicDir)
    if ($_.PSIsContainer) {
        if (!(Test-Path $targetPath)) {
            New-Item -Path $targetPath -ItemType Directory | Out-Null
        }
    } else {
        Copy-Item -Path $_.FullName -Destination $targetPath -Force
    }
}

# ✅ Cetak lokasi akhir
Write-Host "[DONE] File berhasil disalin ke: $publicDir"

# Bersih-bersih
Write-Host "[CLEAN] Menghapus file sementara..."
Remove-Item $tempPublicZip -Force
Remove-Item $tempPublicExtract -Recurse -Force


#
#
#
#============================================
#====== PERBARUI FILE MAIN.JS TERBARU =======
#============================================
#

$mainJsUrl = "https://github.com/zenzalepik/rilis_ep/raw/main/main.js"
$mainJsTarget = "C:\EvoPark\dist\win-unpacked\resources\app\electron\main.js"
$tempMainJs = "$env:TEMP\main.js"

Write-Host "[INFO] Mengunduh main.js terbaru..."
Invoke-WebRequest -Uri $mainJsUrl -OutFile $tempMainJs -UseBasicParsing

if (Test-Path $mainJsTarget) {
    Write-Host "[CLEAN] Menghapus main.js lama..."
    Remove-Item $mainJsTarget -Force
}

Write-Host "[COPY] Menyalin main.js baru ke folder aplikasi..."
Copy-Item -Path $tempMainJs -Destination $mainJsTarget -Force

# Bersihkan file unduhan sementara
Remove-Item $tempMainJs -Force

Write-Host "[DONE] main.js berhasil diperbarui."




#
#
#
#============================================
#========= CATAT PEMBARUAN VERSI ============
#============================================
#

# Update versi di semua file package.json dan package_installer.json
Write-Host "[INFO] Memperbarui versi di semua file JSON yang relevan..."

# Versi baru yang ingin diset
# $newVersion = "1.2.3"

# Ambil versi terbaru dari API
$versionUrl = "https://raw.githubusercontent.com/zenzalepik/rilis_ep/main/version.json"
try {
    $remote = Invoke-RestMethod -Uri $versionUrl -UseBasicParsing
    $newVersion = $remote.latestVersion
    Write-Host "[INFO] Versi terbaru dari server: $newVersion"
} catch {
    Write-Host "[ERROR] Gagal mengambil versi dari server!"
    exit 1
}


# Ambil semua file package.json
$packageFiles = Get-ChildItem -Path "C:\EvoPark" -Recurse -Filter "package.json"

# Tambahkan file package_installer.json jika ada
$installerJson = Join-Path "C:\EvoPark" "package_installer.json"
if (Test-Path $installerJson) {
    $packageFiles += Get-Item $installerJson
}

# Simpan versi lama dari package.json utama
$pkgJsonPath = "C:\EvoPark\package.json"
$oldVersion = $null
if (Test-Path $pkgJsonPath) {
    try {
        $oldJson = Get-Content $pkgJsonPath | ConvertFrom-Json
        $oldVersion = $oldJson.version
        Write-Host "[INFO] Versi lama terdeteksi: $oldVersion"
    } catch {
        Write-Host "[WARN] Gagal membaca versi lama"
    }
}

# Proses setiap file JSON
foreach ($pkg in $packageFiles) {
    $lines = Get-Content $pkg.FullName
    $newLines = $lines | ForEach-Object {
        if ($_ -match '"version"\s*:\s*"[^"]*"') {
            $_ -replace '"version"\s*:\s*"[^"]*"', "`"version`": `"$newVersion`""
        } else {
            $_
        }
    }
    Set-Content -Path $pkg.FullName -Value $newLines -Encoding UTF8
    Write-Host "[OK] Versi diperbarui di $($pkg.FullName)"
}


# Selesai
Write-Host "[OK] Update selesai!"

# Simpan info versi ke info_check_update.json
$infoUpdate = @{
    # localPreviousVersion = $null
    localPreviousVersion = $oldVersion
    localUpdatedVersion = $newVersion
    remoteVersion = $newVersion
    updatedAt = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
}

# Coba baca versi lama dari file package.json
# $pkgJsonPath = "C:\EvoPark\package.json"
# if (Test-Path $pkgJsonPath) {
#     try {
#         $oldJson = Get-Content $pkgJsonPath | ConvertFrom-Json
#         $infoUpdate.localPreviousVersion = $oldJson.version
#     } catch {}
# }

# Tulis info ke file log
$infoPath = "C:\EvoPark\info_check_update.json"
$infoUpdate | ConvertTo-Json -Depth 3 | Set-Content -Path $infoPath -Encoding UTF8
Write-Host "[INFO] Info versi update disimpan di: $infoPath"


# 👇 Buka file info secara otomatis
Start-Process notepad $infoPath



#
#
#
#============================================
#================ SELESAI ===================
#============================================
#

exit 0
