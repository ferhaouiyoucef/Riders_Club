@echo off
echo Preparing offline vendor files...
node scripts\prepare_offline.js
if %errorlevel% neq 0 (
  echo Failed to download vendor files. Ensure Node.js is installed and you are online.
  pause
  exit /b %errorlevel%
)
echo Installing electron dev deps...
npm install
echo Packaging app for local platform...
npx electron-packager . "Riders Club" --out=dist --overwrite --icon=assets\icon_512.png
echo Done. Look in the dist folder.
pause
