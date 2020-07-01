const ipcRenderer = require("electron").ipcRenderer;
//是否登录
ipcRenderer.send("isLogin");

ipcRenderer.on("test2", function (e, data) {
    console.log(data);
});

//登录
ipcRenderer.on("login", function (e, data) {
    console.log("login");
});
//展示首页
ipcRenderer.on("show", function (e, data) {
    console.log("show");
});
