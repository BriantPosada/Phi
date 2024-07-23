const { app, BrowserWindow } = require('electron');
const { setMainMenu } = require('./menu.js');
const path = require('node:path');

let mainWindow;

const createWindow = () => {
     mainWindow = new BrowserWindow({
        /*
        width: 1200,
        height: 1000,
*/
        minWidth: 1200, //1200
        minHeight: 900,
        webPreferences: {
         preload: path.join(__dirname,'./preload.js'),
         contextIsolation:true,
         nodeIntegration: false,
        },
        icon: `${__dirname}/assets/icono.png`
    });

    mainWindow.loadFile('./home.html');

 setMainMenu(mainWindow)

}
    app.whenReady().then(createWindow);
    
app.on('window-all-closed', () => {
if (process.platform != 'darwin') {
    app.quit();
}


});









