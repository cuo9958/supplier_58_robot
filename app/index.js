const { app, BrowserWindow, ipcMain, session } = require("electron");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const Store = require("electron-store");
const web = require("./web");
const cheerio = require("cheerio");

const Cache = new Store({
    name: "supplier_58_robot",
});

let contents = null;
let Cookies = {};
let win = null;
async function createWindow() {
    const cookies = Cache.get("cookies", "");
    cookies.split(";").forEach((item) => {
        const list = item.split("=");
        Cookies[list[0]] = list[1];
    });
    // 创建浏览器窗口
    win = new BrowserWindow({
        width: 1200,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    const isload = isLogin();

    if (isload) {
        web.openHome(win);
    } else {
        web.openLogin(win);
    }
    contents = win.webContents;

    contents.on("did-finish-load", function (e) {
        const url = e.sender.history[e.sender.currentIndex];
        console.log("did-finish-load", url);
        if (url.indexOf("http") === 0) {
            const js = fs.readFileSync(path.join(__dirname, "../dist/js/main.js")).toString();
            contents.executeJavaScript(js);
        }
    });
}

app.whenReady().then(createWindow);

//当所有窗口都被关闭后退出
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
app.on("ready", function () {
    session.defaultSession.cookies.addListener("changed", function (e, d) {
        console.log(d);
        Cookies[d.name] = d.value;
    });
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
            Cookie: getCookies(),
        },
    });
}

function getCookies() {
    let cookie = "";
    for (const key in Cookies) {
        cookie += `${key}=${Cookies[key]};`;
    }
    return cookie;
}

//     contents.send("test2", "123");
// event.sender.send("test2", "adwa");

//是否登录
async function isLogin() {
    const res = await getHtml("http://gys.1zu.com/admin/login.htm");
    if (res.status !== 200) {
        console.log("接口失败");
        return false;
    }
    const html = res.data;
    if (html.indexOf("立即登录") > 0) {
        console.log("需要登录");
        Cache.set("cookies", "");
        return false;
    } else {
        Cache.set("cookies", getCookies());
        return true;
    }
}

ipcMain.on("logout", logout);
function logout(event) {
    web.openLogin(win);
}

ipcMain.on("upload1", upload1);
async function upload1(e, path, params) {
    console.log(path, params);
    //
    const res = await getHtml("http://gys.1zu.com/cleaningWeek/listCleaningWeekPlanItem.htm?" + params + "&currentPage=1&pageSize=10");

    const $ = cheerio.load(res.data);
    const pagecount = $(".searchPage .allPage").text();
    if (pagecount > 10) {
        contents.send("toast", "下载的太多了:" + pagecount);
        return;
    }
    console.log("总x页", pagecount);
    console.log($(".searchPage .page-sum").text());
    contents.send("download", 1, pagecount);
    const table = $("#tableSort tr");
    table.each((item) => {
        const td1 = $("td", item).eq(0).text();
        console.log(item, td1, table[item]);
    });
}
