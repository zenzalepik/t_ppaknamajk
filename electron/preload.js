// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  checkUpdate: () => ipcRenderer.invoke('check-update'),
  runUpdate: () => ipcRenderer.invoke('run-update'),

//   getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  onStatus: (callback) =>
    ipcRenderer.on('loading-status', (_, msg) => callback(msg)),
  onLog: (callback) => ipcRenderer.on('log:stdout', (_, log) => callback(log)),
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  // onStdout: (callback) =>
  //   ipcRenderer.on('log:stdout', (_, msg) => callback(msg)),
  // onStderr: (callback) =>
  //   ipcRenderer.on('log:stderr', (_, msg) => callback(msg)),
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  on: (channel, listener) => ipcRenderer.on(channel, listener),
  send: (channel, data) => ipcRenderer.send(channel, data), // ✅ Tambahkan ini
});