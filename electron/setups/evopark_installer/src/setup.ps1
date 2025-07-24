# Direktori dasar
$base = "C:\EvoPark"

# STEP 1: Unduh dan ekstrak project.zip dan node.exe
Write-Host "⬇️ Mengunduh kerangka aplikasi"
$ProgressPreference = 'SilentlyContinue'
New-Item -ItemType Directory -Path "$base\Downloads" -Force | Out-Null
Invoke-WebRequest -Uri 'https://github.com/zenzalepik/rilis_ep/raw/main/project.zip' -OutFile "$base\Downloads\project.zip"
Expand-Archive -Path "$base\Downloads\project.zip" -DestinationPath $base -Force
# STEP 1.5: Unduh node.exe dan letakkan di resources
$nodeTargetDir = "$base\dist\win-unpacked\resources"
New-Item -ItemType Directory -Path $nodeTargetDir -Force | Out-Null

$nodeUrl = 'https://github.com/zenzalepik/rilis_ep/raw/main/node.exe'
$nodeTarget = Join-Path $nodeTargetDir "node.exe"

Write-Host "⬇️ Mengunduh node.exe ke $nodeTarget..."
Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeTarget -UseBasicParsing


# Validasi unduhan
if ((Get-Item $nodeTarget).Length -lt 100kb) {
    throw "❌ File node.exe terlalu kecil, kemungkinan gagal unduh"
}
else {
    Write-Host "✅ node.exe berhasil diunduh"
    Set-Content -Path "$base\electron\.local_node.json" -Value 'true'
}


# STEP 2: Tandai local storage RawProject
Set-Content -Path "$base\electron\.local_rawproject.json" -Value 'true'

# STEP 3: Unduh dan ekstrak npm.zip
$ProgressPreference = 'SilentlyContinue'
New-Item -ItemType Directory -Path "$base\node_modules" -Force | Out-Null
Invoke-WebRequest -Uri 'https://github.com/zenzalepik/rilis_ep/raw/main/npm.zip' -OutFile "$base\npm.zip"
Expand-Archive -Path "$base\npm.zip" -DestinationPath "$base\node_modules" -Force

# STEP 4: Jalankan npm install
# Push-Location -Path $base
# & "$base\dist\win-unpacked\resources\node.exe" "node_modules\npm\bin\npm-cli.js" install
# Pop-Location

# STEP 4: Salin package_installer.json → package.json dan jalankan npm install
Copy-Item "$base\package_installer.json" "$base\package.json" -Force
Push-Location -Path $base
& "$base\dist\win-unpacked\resources\node.exe" "node_modules\npm\bin\npm-cli.js" install
Pop-Location

# STEP 5: Salin node_modules ke resources (atau pakai symlink)
#Copy-Item "$base\node_modules" "$base\dist\win-unpacked\resources" -Recurse -Force
cmd /c mklink /D "$base\dist\win-unpacked\resources\node_modules" "$base\node_modules"

# STEP 6: Tandai local storage NodeModules
Set-Content -Path "$base\electron\.local_nodemodules.json" -Value 'true'

# STEP 7: Jalankan next start (ditampilkan di window terpisah)
# Start-Process cmd.exe "/c cd /d $base && $base\dist\win-unpacked\resources\node.exe node_modules\npm\bin\npm-cli.js start"
# Start-Process cmd.exe "/c cd /d $base && $base\dist\win-unpacked\resources\node.exe node_modules\npm\bin\npm-cli.js start"

# STEP 8: Unduh MainApp.exe dengan retry
$mainAppUrl = 'https://github.com/zenzalepik/rilis_ep/raw/main/Evosist_Parking_Desktop_-win-unpacked.exe'
$mainAppTarget = "$base\dist\win-unpacked\Evosist_Parking_Desktop_-win-unpacked.exe"
$maxRetries = 3
$retryDelay = 3  # dalam detik

New-Item -ItemType Directory -Path (Split-Path $mainAppTarget) -Force | Out-Null

for ($i = 1; $i -le $maxRetries; $i++) {
    try {
        Write-Host "🚚 Mencoba unduh MainApp (Percobaan $i)..."
        Invoke-WebRequest -Uri $mainAppUrl -OutFile $mainAppTarget -UseBasicParsing
        $size = (Get-Item $mainAppTarget).Length
        if ($size -lt 100kb) {
            throw "❌ Ukuran file terlalu kecil ($size byte), kemungkinan gagal unduh"
        }
        Write-Host "✅ MainApp berhasil diunduh"
        break
    }
    catch {
        Write-Warning "Percobaan $i gagal: $_"
        if ($i -eq $maxRetries) {
            throw "❌ Gagal mengunduh MainApp setelah $maxRetries percobaan."
        }
        Start-Sleep -Seconds $retryDelay
    }
}

# STEP 9: Buat shortcut
cscript //nologo "$base\electron\createShortcutDesktop.vbs"

# STEP 10: Tandai local storage Shortcut
Set-Content -Path "$base\electron\.local_shortcut.json" -Value 'true'

# STEP 10: Tandai local storage Shortcut
# Set-Content -Path "$base\electron\.local_shortcut.json" -Value 'true'

# ✅ CEK FILE next bin SEBELUM STEP 11
# $nextBinPath = "$base\dist\win-unpacked\resources\node_modules\next\dist\bin\next"
# if (-Not (Test-Path $nextBinPath)) {
#     Write-Warning "⚠️ File next CLI tidak ditemukan. Menjalankan npm install next@15.3.1..."

#     Push-Location -Path $base
#     & "$base\dist\win-unpacked\resources\node.exe" "node_modules\npm\bin\npm-cli.js" install next@15.3.1
#     Pop-Location

#     # Cek ulang setelah install
#     if (-Not (Test-Path $nextBinPath)) {
#         throw "❌ Gagal menginstal next@15.3.1. File masih tidak ditemukan: $nextBinPath"
#     } else {
#         Write-Host "✅ Next CLI berhasil diinstal."
#     }
# } else {
#     Write-Host "✅ Next CLI ditemukan di: $nextBinPath"
# }
$nextBinPath = "$base\dist\win-unpacked\resources\node_modules\next\dist\bin\next"
$maxRetries = 7
$retryDelay = 3  # detik

for ($i = 1; $i -le $maxRetries; $i++) {
    if (-Not (Test-Path $nextBinPath)) {
        Write-Warning "⚠️ Next CLI tidak ditemukan. (Percobaan $i/$maxRetries)"
        Push-Location -Path $base
        try {
            & "$base\dist\win-unpacked\resources\node.exe" "node_modules\npm\bin\npm-cli.js" install next@15.3.1
        }
        catch {
            Write-Warning "❌ Gagal install pada percobaan $i  $_"
        }
        Pop-Location

        if (Test-Path $nextBinPath) {
            Write-Host "✅ Next CLI berhasil diinstal pada percobaan ke-$i."
            break
        }
        elseif ($i -eq $maxRetries) {
            throw "❌ Gagal menginstal next@15.3.1 setelah $maxRetries percobaan."
        }

        Start-Sleep -Seconds $retryDelay
    }
    else {
        Write-Host "✅ Next CLI ditemukan di: $nextBinPath"
        break
    }
}


# STEP 11: Jalankan aplikasi utama
Start-Process "$base\dist\win-unpacked\Evosist_Parking_Desktop_-win-unpacked.exe"

