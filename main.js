const {app, BrowserWindow, ipcMain} = require('electron');
const { webContents } = require('electron')
require('@electron/remote/main').initialize()



app.disableHardwareAcceleration({});
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

var mainWindow;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});


app.on('ready', function() {
  mainWindow = new BrowserWindow({autoHideMenuBar: true, frame: false, width: 850, height: 550, maxWidth: 850, maxHeight: 550, minWidth: 850, minHeight: 550, webPreferences: {nodeIntegration: true, contextIsolation: false, enableRemoteModule: true}});

  mainWindow.loadURL('file://' + __dirname + '/helper.html');
  require("@electron/remote/main").enable(mainWindow.webContents)

  mainWindow.setAlwaysOnTop(true, 'screen');



  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});


ipcMain.on('open_new-page', (event, page_path) =>{
  mainWindow.loadURL(`file://${__dirname}/${page_path}`);
});

ipcMain.on('minimize', (event) =>{
  mainWindow.minimize();
});

ipcMain.on('close', (event) =>{
  mainWindow.close();
});
