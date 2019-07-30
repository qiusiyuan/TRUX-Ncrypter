const { app, BrowserWindow } = require('electron');
const path = require('path');
// let server = require(path.join(__dirname, './server/app'));
let win = null;
const isDev = require("electron-is-dev");

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1296,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // and load the index.html of the app.
  win.loadURL(
    path.join('file://', __dirname, 'build/index.html')
  );

  // Open the DevTools.
  if (isDev) win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
