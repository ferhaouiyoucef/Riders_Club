#!/usr/bin/env bash
set -e
echo "Preparing offline vendor files..."
node scripts/prepare_offline.js
echo "Installing electron dev deps..."
npm install
echo "Packaging app for local platform..."
npx electron-packager . "Riders Club" --out=dist --overwrite --icon=assets/icon_512.png
echo "Done. Look in the dist folder."
