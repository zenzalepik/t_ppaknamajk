@echo off
title EvoPark Project Setup

:: Jalankan PowerShell script
powershell -ExecutionPolicy Bypass -File "%~dp0setup.ps1"

pause
exit
