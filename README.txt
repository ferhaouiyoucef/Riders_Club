
Riders Club — Offline bundle and packaging helpers
=================================================

What I prepared for you:
- A ready project that runs in Electron (index.html, style.css, script.js)
- Vendor placeholder files in /vendor (they will be downloaded to become full offline libs)
- High-resolution app icon: assets/icon_512.png (512x512)
- Helper script to download vendor files and package the app: scripts/prepare_offline.js
- Convenience scripts:
  - prepare_offline_and_package.bat  (Windows)
  - prepare_offline_and_package.sh   (macOS / Linux)
- package.json includes scripts: "prepare-offline", "pack", "build-all"

Important — what I cannot do inside this environment:
- I cannot run `npm install` or `electron-packager` here to build native .exe/.dmg/.AppImage files because this environment doesn't have npm/electron tooling or access to build platforms.
- I cannot download the full copies of Tailwind/Feather/SheetJS here due to network restrictions in this environment.

What you should run locally (one-time) to create fully offline files and platform builds:
1. Install Node.js (LTS) from https://nodejs.org/
2. Open a terminal in this project folder.
3. Run (online required once to fetch vendor libs):
   npm install
   npm run prepare-offline
   npm run pack
   # pack will create builds for your local platform; to build other platforms you can use electron-packager with --platform
4. Optionally, to build installers (recommended):
   - For Windows: use electron-winstaller or electron-builder (see their docs).
   - For macOS: use electron-builder on a mac to create .dmg.
   - For Linux: use electron-builder or create an AppImage.

If you want, I can:
- 1) Try to generate builds here if you provide a GitHub repo where I can push the project (then you can run GitHub Actions to build cross-platform installers), or
- 2) Walk you step-by-step while you run the prepare scripts on your PC (I can give commands and troubleshoot), or
- 3) Create a GitHub Actions workflow file you can add to the repo to produce .exe/.dmg/.AppImage automatically (CI will run the builds).

Summary of choices I used:
- Icon: 512x512 (high-res)
- No splash screen — app opens directly in a windowed, resizable mode
- Cross-platform packaging steps included via scripts (you run them on your machine)

Files included:
['assets', 'vendor', 'index.html', 'style.css', 'script.js', 'bg.png', 'package.json', 'main.js', 'scripts', 'prepare_offline_and_package.bat', 'prepare_offline_and_package.sh']

