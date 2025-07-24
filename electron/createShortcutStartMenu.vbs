' 🔗 Buat shortcut di Start Menu
Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile = oWS.ExpandEnvironmentStrings("%APPDATA%") & "\Microsoft\Windows\Start Menu\Programs\SistemParkir.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = "C:\EvoPark\dist\win-unpacked\Evosist_Parking_Desktop_-win-unpacked.exe"
oLink.WorkingDirectory = "C:\EvoPark\dist\win-unpacked"
oLink.Save
