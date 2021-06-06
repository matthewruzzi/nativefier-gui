const { app, dialog } = require("electron");
const path = require("path");
var nativefier = require("nativefier").default;

function updateApp(path) {
    const appPath = dialog.showOpenDialogSync(null, {
        properties: ["openFile", "openDirectory"],
        buttonLabel: "Update Nativefier App",
    })[0];
    console.log("Upgrading " + appPath);
    const args = { "upgrade": appPath }
    nativefier(args, function (error, appPath) {
        if (error) {
            console.error(error);
            return;
        }
        console.log("App has been nativefied to", appPath);
    });
}
module.exports = updateApp;