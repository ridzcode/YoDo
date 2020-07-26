const { app, BrowserWindow, Menu } = require('electron')
const shell = require('electron').shell
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const aplik = express();

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the main.html of the app.
  win.loadFile('main.html')

  win.setMenu(null);

  var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
        submenu: [
            {
              label:'Donate',
              click() { 
                shell.openExternal('https://paypal.me/ridz97/');
              },
              accelerator: 'CmdOrCtrl+Shift+D'
            },
            {
              label:'Exit', 
              click() {
                  app.quit();
              } 
            }
        ]
    }
])
Menu.setApplicationMenu(menu); 

  // Open the DevTools.
  //win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

//==========================================================

aplik.use(cors());
aplik.listen(4000, () => {
    console.log('Server Works!');
});
aplik.get('/download', (req,res) => {
var URL = req.query.URL;
res.header('Content-Disposition', 'attachment; filename="youtubeVideo.mp4"');
ytdl(URL, {
    format: 'mp4'
    }).pipe(res);
});

//==========================================================

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
