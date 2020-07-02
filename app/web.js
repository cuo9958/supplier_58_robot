module.exports = {
    openLogin(win) {
        win.loadURL("http://gys.1zu.com/admin/login.htm");
        // 打开开发者工具
        win.webContents.openDevTools();
    },
    openHome(win) {
        win.loadFile("../dist/index.html");
        // 打开开发者工具
        win.webContents.openDevTools();
    },
};
