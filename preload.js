const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('API', {
   onUpdateTheme: (callback) => ipcRenderer.on('update-theme', callback)
})
