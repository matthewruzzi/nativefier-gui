const { ipcRenderer } = require("electron");

function createNativefierApp(name, url) {
  ipcRenderer.sendSync("create-app", {
    name: name, // will be inferred if not specified
    targetUrl: url, // required
  });
}
