const { Menu } = require('electron')

const setMainMenu = (mainWindow) => {
    const template = [
                {
                    label: 'Options',
                    submenu: [
                        {role: 'about'},
                        {type: 'separator'},
                        {role: 'quit'}
                    ]
                },
                {
    label: 'Themes',
    submenu: [
        {
            label: 'Light',
            click: () => {
                mainWindow.webContents.send('update-theme', 'light')
            }
        },
        {type: 'separator' },
        {
            label: 'Dark',
            click: () => {
                mainWindow.webContents.send('update-theme', 'dark')
            }
        }
    ]
},
{
    label: 'View',
    submenu: [
        {role: 'reload' },
      //  {role: 'forceReload' },
        {role: 'toggleDevTools' },
        {type: 'separator' },
        {role: 'togglefullscreen' }
    ]
}
    ]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
}

module.exports = {
    setMainMenu
}