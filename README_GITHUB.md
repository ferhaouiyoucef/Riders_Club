# RidersClub

This repository packages your existing HTML/CSS/JS into an Electron app named **Riders Club**.
Push this repo to GitHub under **ferhaouiyoucef/RidersClub** and then open the *Actions* tab —
the workflow `Build Electron App (Windows, macOS, Linux)` will run and produce installers for each platform
(Windows NSIS `.exe`, macOS `.dmg`, Linux `.AppImage`) in the *Artifacts* section.

How to use:
1. Create a new public repository named `RidersClub` on GitHub under your account **ferhaouiyoucef**.
2. Upload the contents of this ZIP (drag-and-drop) or push via Git.
3. On GitHub, go to **Actions** → select the workflow and run it (or wait for the push).
4. After the workflow completes, download the artifacts for your platform from the workflow run (Outputs → Artifacts).

Notes:
- The build requires GitHub Actions runners; macOS builds require macOS runner (provided by GitHub).
- The workflow will run `npm ci`, `npm run prepare-offline`, then `npm run dist` to build installers.
- The first run may take several minutes to download dependencies.
