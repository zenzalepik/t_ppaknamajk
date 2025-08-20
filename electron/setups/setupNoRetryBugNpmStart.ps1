# Direktori dasar
$base = "C:\EvoPark"

# STEP 1: Unduh dan ekstrak project.zip
New-Item -ItemType Directory -Path "$base\Downloads" -Force | Out-Null
Invoke-WebRequest -Uri 'https://github.com/zenzalepik/rilis_ep/raw/main/project.zip' -OutFile "$base\Downloads\project.zip"
Expand-Archive -Path "$base\Downloads\project.zip" -DestinationPath $base -Force

# STEP 2: Tandai local storage RawProject
Set-Content -Path "$base\electron\.local_rawproject.json" -Value 'true'

# STEP 3: Unduh dan ekstrak npm.zip
$ProgressPreference = 'SilentlyContinue'
New-Item -ItemType Directory -Path "$base\node_modules" -Force | Out-Null
Invoke-WebRequest -Uri 'https://github.com/zenzalepik/rilis_ep/raw/main/npm.zip' -OutFile "$base\npm.zip"
Expand-Archive -Path "$base\npm.zip" -DestinationPath "$base\node_modules" -Force

# STEP 4: Jalankan npm install
Push-Location -Path $base
& "$base\dist\win-unpacked\resources\node.exe" "node_modules\npm\bin\npm-cli.js" install
Pop-Location

# STEP 5: Salin node_modules ke resources (atau pakai symlink)
Copy-Item "$base\node_modules" "$base\dist\win-unpacked\resources\node_modules" -Recurse -Force

# STEP 6: Tandai local storage NodeModules
Set-Content -Path "$base\electron\.local_nodemodules.json" -Value 'true'

# STEP 7: Jalankan next start (ditampilkan di window terpisah)
Start-Process cmd.exe "/c cd /d $base && $base\dist\win-unpacked\resources\node.exe node_modules\npm\bin\npm-cli.js start" #Baris ini menyebabkan error aplikasi Tidak Segera Memuat Next Build padahal semua kebutuhan install sudah tercukupi

# STEP 8: Unduh MainApp.exe
New-Item -ItemType Directory -Path "$base\dist\win-unpacked" -Force | Out-Null
Invoke-WebRequest -Uri 'https://github.com/zenzalepik/rilis_ep/raw/main/Evosist_Parking_Desktop_-win-unpacked.exe' -OutFile "$base\dist\win-unpacked\Evosist_Parking_Desktop_-win-unpacked.exe"

# STEP 9: Buat shortcut
cscript //nologo "$base\electron\createShortcutDesktop.vbs"

# STEP 10: Tandai local storage Shortcut
Set-Content -Path "$base\electron\.local_shortcut.json" -Value 'true'

# STEP 11: Jalankan aplikasi utama
Start-Process "$base\dist\win-unpacked\Evosist_Parking_Desktop_-win-unpacked.exe"
