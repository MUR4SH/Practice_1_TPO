const { app, BrowserWindow } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
      width: 390,
      height: 450,
      webPreferences: {
        nodeIntegration: true
      }
    })
  
    win.loadFile('index.html')
    win.setResizable(false);
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