const { app, BrowserWindow } = require('electron');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handleRequest = nextApp.getRequestHandler();

app.whenReady().then(async () => {
  await nextApp.prepare(); // Menjalankan Next.js di mode dev

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL('http://localhost:3000'); // Memuat Next.js di Electron
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});