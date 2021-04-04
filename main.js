const { app, BrowserWindow } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
      width: 390,
      height: 450,
      webPreferences: {
        devTools: false,
        nodeIntegration: true,
        enableRemoteModule: true,
      }
    })
  
    win.loadFile('index.html')
    win.setResizable(false);
    win.setMenu(null)
}

app.whenReady().then(createWindow)
  
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
  
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
})