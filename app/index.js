const { app, BrowserWindow, ipcMain } = require("electron");
const axios = require("axios");

let contents = null;
let Cookie = "";
function createWindow() {
    // 创建浏览器窗口
    const win = new BrowserWindow({
        width: 1200,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // 并且为你的应用加载index.html
    win.loadFile("../dist/index.html");

    // 打开开发者工具
    win.webContents.openDevTools();
    contents = win.webContents;
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow);

//当所有窗口都被关闭后退出
app.on("window-all-closed", () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
/**
 * 获取网页
 * @param {*} url url
 */
function getHtml(url) {
    return axios({
        url: url,
        method: "get",
        headers: {
            Referer: "http://gys.1zu.com/cleaningWeek/initListCleaningWeekPlanItem.htm?source=init",
            Cookie,
        },
    });
}

//     contents.send("test2", "123");
// event.sender.send("test2", "adwa");

ipcMain.on("isLogin", isLogin);
//是否登录
async function isLogin(event, data) {
    const res = await getHtml("http://gys.1zu.com/admin/login.htm");
    if (res.status !== 200) {
        console.log("接口失败");
        return;
    }
    const html = res.data;
    if (html.indexOf("立即登录") > 0) {
        console.log("需要登录");
        contents.send("login");
    } else {
        contents.send("show");
    }
}
