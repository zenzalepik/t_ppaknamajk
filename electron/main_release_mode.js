const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let serverProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // ini yang menyembunyikan title bar OS
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // tambahkan preload
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  // Jalankan Node portable untuk `next start`
  const isPackaged = app.isPackaged;

  const nodePath = isPackaged
    ? path.join(process.resourcesPath, 'node.exe')
    : path.join(__dirname, 'assets', 'node.exe');

  // const serverEntry = isPackaged
  //   ? path.join(process.resourcesPath, 'server', 'server.js') // nanti kamu copy manual
  //   : path.join(__dirname, '..', '.next', 'standalone', 'server.js');
  const nextStartBin = isPackaged
    ? path.join(
        process.resourcesPath,
        'node_modules',
        'next',
        'dist',
        'bin',
        'next'
      )
    : path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next');

  //Testing============================================================================
  console.log('Electron App started');
  console.log('Node path:', nodePath);
  console.log('Server entry:', nextStartBin);

  serverProcess = spawn(nodePath, [nextStartBin, 'start'], {
    cwd: isPackaged ? process.resourcesPath : path.join(__dirname, '..'),
    env: {
      ...process.env,
      PORT: '3000',
    },
    shell: false,
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`Next.js: ${data}`);
      BrowserWindow.getAllWindows()[0]?.webContents.send('log:stdout', data.toString());
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Next.js ERROR: ${data}`);
      // BrowserWindow.getAllWindows()[0]?.webContents.send('log:stderr', data.toString());
  });

  serverProcess.on('error', (err) => {
    console.error('Failed to start child process:', err);
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (serverProcess) serverProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});

// Tangani sinyal dari preload/renderer
ipcMain.on('window-minimize', () => {
  BrowserWindow.getFocusedWindow()?.minimize();
});
ipcMain.on('window-maximize', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;
  win.isMaximized() ? win.unmaximize() : win.maximize();
});
ipcMain.on('window-close', () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
  app.quit();
});
