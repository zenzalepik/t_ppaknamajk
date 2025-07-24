const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const { globalShortcut } = require('electron');
const fs = require('fs');
const { exec } = require('child_process');
// Tambahkan ini sebelum ipcMain.handle('check-update')
const checkUpdatePath = path.join(__dirname, 'update', 'checkUpdate.bat');
const updateAppPath = path.join(__dirname, 'update', 'updateApp.bat');

let serverProcess;
let loadingWindow; // 👉 jendela loading
let mainWindow; // 👉 jendela utama (Next.js)
let hasOpenedMainWindow = false;

function hideFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    exec(`attrib +h "${folderPath}"`, (error) => {
      if (error) {
        console.error(`Gagal menghidden folder: ${error.message}`);
      }
    });
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
      // devTools: false,
      devTools: true,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createLoadingWindow() {
  // 👉 Jendela loading ditampilkan saat menunggu Next.js siap
  loadingWindow = new BrowserWindow({
    width: 720,
    height: 500,
    frame: false,
    resizable: false,
    show: true,
    webPreferences: {
      // devTools: false,
      devTools: true,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  loadingWindow.loadFile(path.join(__dirname, 'loading.html')); // 👉 file loading kamu

  // loadingWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  hideFolder('C:\\EvoPark'); // 🔒 Sembunyikan folder di awal

  globalShortcut.register('F12', () => {
    // Mencegah F12 membuka DevTools
    console.log('F12 disabled');
  });

  globalShortcut.register('Control+I', () => {
    // Mencegah Ctrl+I
    console.log('Ctrl+I disabled');
  });

  globalShortcut.register('Control+Shift+I', () => {
    console.log('🔒 Ctrl+Shift+I disabled');
    // Tidak membuka DevTools
  });

  // Jalankan Node portable untuk `next start`
  const isPackaged = app.isPackaged;

  const nodePath = isPackaged
    ? path.join(process.resourcesPath, 'node.exe')
    : path.join(__dirname, 'assets', 'node.exe');

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

  console.log('Electron App started');
  console.log('Node path:', nodePath);
  console.log('Server entry:', nextStartBin);

  // 👉 Tampilkan loading window sebelum memulai server
  createLoadingWindow();

  // ✅ TUNDA 2 detik sebelum menjalankan node
  setTimeout(() => {
    serverProcess = spawn(nodePath, [nextStartBin, 'start'], {
      cwd: isPackaged ? process.resourcesPath : path.join(__dirname, '..'),
      env: {
        ...process.env,
        PORT: '3000',
      },
      shell: false,
    });

    loadingWindow?.webContents.send(
      'loading-status',
      '🟢 Menjalankan server...'
    );

    serverProcess.stdout.on('data', (data) => {
      const message = 'next ▪️ ' + data.toString();
      console.log('🟢 Next stdout:', message);

      // ✅ Tampilkan log ke loading window
      loadingWindow?.webContents.send('log:stdout', message);
      mainWindow?.webContents.send('log:stdout', message);

      // ✅ Kirim status seperti biasa
      loadingWindow?.webContents.send('loading-status', message);

      // ...lanjutan logika deteksi "started", "compiled successfully", dst.
      if (message.toLowerCase().includes('started')) {
        loadingWindow?.webContents.send('loading-status', 'Server aktif... ▪️');
        console.log(
          '4. Server Next.js aktif... =============================================='
        );
      } else if (message.toLowerCase().includes('compiled successfully')) {
        loadingWindow?.webContents.send(
          'loading-status',
          '✅ UI berhasil dimuat... ▪️'
        );
        console.log(
          '5. ✅ UI berhasil dimuat... ▪️ -------------------------------------------'
        );
      } else if (message.toLowerCase().includes('ready')) {
        loadingWindow?.webContents.send(
          'loading-status',
          '🚀 Server siap digunakan... ▪️'
        );
        console.log('6. 🚀 Server siap digunakan...');
      } else if (message.toLowerCase().includes('starting')) {
        loadingWindow?.webContents.send('loading-status', '🚀 Starting... ▪️');
        console.log('7. 🚀 Server siap digunakan...');
      } else {
        loadingWindow?.webContents.send('loading-status', message + '▪️');
        console.log('8. Next. status ... ', message);
      }

      // 👉 Jika server sudah siap, tutup loading & tampilkan jendela utama
      // if (message.includes('started server') || message.includes('ready')) {
      if (
        !hasOpenedMainWindow &&
        (message.toLowerCase().includes('started') ||
          message.toLowerCase().includes('ready') ||
          message.toLowerCase().includes('server') ||
          message.toLowerCase().includes('compiled successfully'))
      ) {
        hasOpenedMainWindow = true;

        console.log('9-- [stdout]', message);
        setTimeout(() => {
          loadingWindow?.webContents.send('loading-status', '9. Memuat UI...');
          createWindow();
          if (loadingWindow) {
            loadingWindow.close();
            loadingWindow = null;
          }
        }, 3000); // 👉 delay kecil biar transisi halus

        setTimeout(() => {
          if (!mainWindow) {
            loadingWindow?.webContents.send(
              'loading-status',
              '10. ⚠️ Timeout: Server belum siap.'
            );
            // createWindow(); // 👉 Hanya jika ingin paksa tetap lanjut
          }
        }, 300000);
      }

      // BrowserWindow.getAllWindows()[0]?.webContents.send(
      //   'log:stdout',
      //   data.toString()
      // );
    });

    serverProcess.stderr.on('data', (data) => {
      console.error(`11. Next.js ERROR: ${data}`);
    });

    serverProcess.on('error', (err) => {
      console.error('12. Failed to start child process:', err);
    });

    // createWindow();
  }, 1555);

  // Daftarkan shortcut khusus, misalnya Ctrl+Alt+D
  globalShortcut.register('Control+Alt+D', () => {
    if (mainWindow) {
      mainWindow.webContents.openDevTools({ mode: 'detach' }); // Bisa juga 'undocked', 'bottom', dll.
    }
  });
});

app.on('window-all-closed', () => {
  console.log('13. Window All Closed');
  if (serverProcess) serverProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});

// Tangani sinyal dari preload/renderer
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});
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
    console.log('14. Server Process Kill');
    serverProcess.kill();
    serverProcess = null;
  }
  app.quit();
});

app.on('before-quit', () => {
  console.log('15. before-quit triggered');
  if (serverProcess) {
    console.log('16. Killing server process before quit...');
    serverProcess.kill();
    serverProcess = null;
  }
});

// ======================
// HANDLER UPDATE SISTEM
// ======================

// Handler untuk Cek Update
ipcMain.handle('check-update', () => {
  const bat = path.join(__dirname, 'update', 'checkUpdate.bat');

  return new Promise((resolve, reject) => {
    const child = spawn(bat, { shell: true }); // Tambahkan shell:true
    let output = '';

    child.stdout.on('data', (data) => (output += data.toString()));

    child.on('close', () => {
      if (output.includes('ADA_VERSI_BARU')) {
        resolve({ updateAvailable: true });
      } else {
        resolve({ updateAvailable: false });
      }
    });

    child.on('error', reject);
  });
});

ipcMain.handle('run-update', () => {
  const bat = path.join(__dirname, 'update', 'updateApp.bat');

  return new Promise((resolve, reject) => {
    const child = spawn(bat, { shell: true }); // Tambahkan shell:true
    let output = '';

    child.stdout.on('data', (data) => (output += data.toString()));

    child.on('close', () => {
      if (output.includes('Update selesai')) {
        resolve({ success: true });
      } else {
        resolve({ success: false, message: output });
      }
    });

    child.on('error', reject);
  });
});

ipcMain.on('set-fullscreen', (event, value) => {
  if (mainWindow) {
    mainWindow.setFullScreen(value);
  }
});
