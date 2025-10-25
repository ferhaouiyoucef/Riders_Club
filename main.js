const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = false;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: true,
    icon: path.join(__dirname, 'assets', 'icon_512.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});