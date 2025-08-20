#D:\Github\evosist_parking-1.0.0\electron\update\checkUpdate.ps1

# URL versi dari server
$versionUrl = "https://raw.githubusercontent.com/zenzalepik/rilis_ep/main/version.json"

# Path ke file info hasil check
$infoPath = "C:\EvoPark\info_check_update.json"

# Ambil versi remote dari GitHub
try {
    $remote = Invoke-RestMethod -Uri $versionUrl -UseBasicParsing
    $remoteVersion = $remote.latestVersion
} catch {
    Write-Output "❌ Gagal ambil versi dari server"
    exit
}

# Ambil versi lokal dari package.json
$packagePath = "C:\EvoPark\package.json"
$packageJson = Get-Content $packagePath | ConvertFrom-Json
$localPreviousVersion = $packageJson.version

# Tentukan apakah perlu update
$needUpdate = $remoteVersion -ne $localPreviousVersion

# Buat objek info versi
# $info = @{
#     localPreviousVersion = $localPreviousVersion
#     remoteVersion = $remoteVersion
#     localUpdatedVersion = if ($needUpdate) { $remoteVersion } else { $null }
#     lastCheckedAt = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
# }

# # Simpan ke file JSON
# $info | ConvertTo-Json -Depth 3 | Set-Content -Path $infoPath -Encoding UTF8

# Buka file hasil info
# Start-Process notepad.exe $infoPath

# Tampilkan status ke konsol
if ($needUpdate) {
    Write-Output "ADA_VERSI_BARU"
} else {
    Write-Output "VERSI_TERBARU"
}
