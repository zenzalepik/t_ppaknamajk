# =======================
# [STATUS] Konfigurasi folder sumber dan target
# =======================
$sourcePath = "D:\Github\evosist_parking-1.0.0"
$targetPath = "D:\Github\ppaknamajk"
$excludeDirs = @(".git", ".next", "node_modules")

# =======================
# [STATUS] 1. Bersihkan folder target (kecuali .git)
# =======================
Write-Host "[STATUS] Membersihkan folder target (kecuali .git)..."
Get-ChildItem -Path $targetPath -Force | Where-Object {
    $_.Name -ne ".git"
} | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# =======================
# [STATUS] 2. Menyalin file dari source ke target
# =======================
Write-Host "[STATUS] Menyalin file dari $sourcePath ke $targetPath ..."
Get-ChildItem -Path $sourcePath -Force | Where-Object {
    $excludeDirs -notcontains $_.Name
} | ForEach-Object {
    $dest = Join-Path $targetPath $_.Name
    Copy-Item $_.FullName -Destination $dest -Recurse -Force
}

# =======================
# [STATUS] 3. Mengunduh strings.js ke src\utils
# =======================
$downloadUrl = "https://github.com/zenzalepik/rilis_ep/raw/main/strings.js"
$utilsPath = Join-Path $targetPath "src\utils"
if (-Not (Test-Path $utilsPath)) {
    New-Item -Path $utilsPath -ItemType Directory -Force | Out-Null
}
$outputFile = Join-Path $utilsPath "strings.js"

Write-Host "[STATUS] Mengunduh strings.js ke $outputFile ..."
Invoke-WebRequest -Uri $downloadUrl -OutFile $outputFile -UseBasicParsing

# =======================
# [STATUS] 4. Git commit dan push
# =======================
Set-Location -Path $targetPath
git add .
$commitMessage = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
git commit -m "$commitMessage"
git push

Write-Host "`n[STATUS] Deploy selesai dengan commit: $commitMessage"
