// main.js

const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const { notification } = require('./tasks/notification.js');

let mainWindow;

app.whenReady().then(() => {

    // --------------------------------------------------------------------- //

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { nodeIntegration: true }
    });

    // --------------------------------------------------------------------- //

    mainWindow.webContents.openDevTools();

    // --------------------------------------------------------------------- //

    mainWindow.loadURL('http://localhost:5173/');

    // --------------------------------------------------------------------- //

});



setInterval(() => {

    mainWindow.webContents.executeJavaScript(`
            const tasksData = localStorage.getItem('tasks');
            tasksData;
        `).then((tasksData) => {

        const filePath = path.join(__dirname, 'tasks/tasksData.js');

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, `// tasksData.js
const tasks = ${tasksData};
module.exports = { tasks };
            `);
        } else {
            fs.writeFileSync(filePath, `// tasksData.js
const tasks = ${tasksData};
module.exports = { tasks };
            `);
        };

    }).catch((error) => {
        console.error(error);
    });

}, 30000);

notification();

// --------------------------------------------------------------------- //

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    };
});

// --------------------------------------------------------------------- //

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    };
});

// --------------------------------------------------------------------- //