const { app, BrowserWindow, dialog, ipcMain, Menu } = require("electron");
const path = require("path");
var nativefier = require("nativefier").default;
const menu = require('./menu');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  Menu.setApplicationMenu(menu);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on("create-app", (event, arg) => {
  console.log(arg); // prints "ping"
  event.returnValue = "pong";
  process.noAsar = true;
  /*var options = {
  name: 'Web WhatsApp', // will be inferred if not specified
    targetUrl: 'http://web.whatsapp.com', // required
  }*/
  try {
    arg["out"] = dialog.showOpenDialogSync(null, {
      properties: ["openFile", "openDirectory"],
      buttonLabel: "Save Nativefier App",
    })[0];
  } catch (error) {
    arg["out"] = "Dialog canceled";
  }
  if (arg["out"] == "Dialog canceled") {
    console.log("Dialog canceled");
  } else {
    nativefier(arg, function (error, appPath) {
      if (error) {
        console.error(error);
        return;
      }
      console.log("App has been nativefied to", appPath);
    });
  }
});


