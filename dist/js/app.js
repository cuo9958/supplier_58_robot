const ipcRenderer = require("electron").ipcRenderer;
ipcRenderer.send("test", "{a:1}");
ipcRenderer.on("test2", function (e, data) {
    console.log(data);
});
