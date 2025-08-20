@echo off
echo 🔧 Memulai pembersihan aplikasi...

:: 0. Hapus cache build agar hasil build lebih ringan
echo 🧹 Menghapus cache .next dan cache node_modules...
call npx rimraf .next/cache
call npx rimraf node_modules/.cache

:: 1. Install alat bantu (gunakan modclean versi stabil)
echo 📦 Menginstall depcheck dan modclean...
call npm install depcheck modclean@2 --save-dev

:: 2. Jalankan depcheck
echo 🔍 Mendeteksi dependency tidak terpakai...
call npx depcheck --json > unused.json

:: 3. Jalankan skrip Node untuk menghapus dependency
echo 🧹 Menghapus dependency tidak terpakai...
node -e "const fs = require('fs'); const { execSync } = require('child_process'); const data = JSON.parse(fs.readFileSync('unused.json', 'utf8')); const unused = [...(data.dependencies || []), ...(data.devDependencies || [])]; if (unused.length === 0) { console.log('✅ Tidak ada yang perlu dihapus.'); process.exit(0); } console.log('📦 Menghapus:', unused.join(', ')); execSync('npm uninstall ' + unused.join(' '), { stdio: 'inherit' });"

:: 4. Bersihkan file sampah di node_modules
echo 🧽 Membersihkan file sampah di node_modules...
call npx modclean --run

:: 5. Build ulang (opsional)
echo 🏗️ Build ulang project (standalone)...
call pnpm run build:web

echo ✅ Pembersihan selesai!
pause
