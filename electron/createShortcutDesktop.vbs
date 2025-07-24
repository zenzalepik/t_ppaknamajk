' 🔗 Buat shortcut di Desktop
Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile = WScript.CreateObject("WScript.Shell").SpecialFolders("Desktop") & "\SistemParkir.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = "C:\EvoPark\dist\win-unpacked\Evosist_Parking_Desktop_-win-unpacked.exe"
oLink.WorkingDirectory = "C:\EvoPark\dist\win-unpacked"
oLink.Save
