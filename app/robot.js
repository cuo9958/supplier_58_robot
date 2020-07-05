const Router = require("koa-router");
const axios = require("axios");
const TaskReduce = require("./task");
const WebSearch = require("./web_search");
const TaskModel = require("../models/task");

const routers = new Router();

//是否登录
routers.get("/islogin", async function (ctx) {
    const data = await WebSearch.isLogin();
    ctx.body = {
        code: 1,
        data,
    };
});
//代理验证码
routers.get("/code", async function (ctx) {
    const data = await axios.get("http://gys.1zu.com/check_code.htm", {
        responseType: "arraybuffer",
    });
    ctx.set("content-type", data.headers["content-type"]);
    const list = data.headers["set-cookie"];
    list.forEach((item) => {
        const tmp = item.split(";")[0];
        const cks = tmp.split("=");
        ctx.cookies.set(cks[0], cks[1]);
    });
    ctx.body = data.data;
});
//登录
routers.post("/login", async function (ctx) {
    //_sy_iu_0201
    const admin_cookie = ctx.cookies.get("_a_caa_admin_");
    WebSearch.setCookie("_a_caa_admin_=" + admin_cookie);
    const { username, password, checkCode } = ctx.request.body;

    const res = await WebSearch.login(username, password, checkCode);
    if (res) {
        ctx.cookies.set("_a_caa_admin_", "");
        ctx.body = {
            code: 1,
            data: 1,
        };
    } else {
        ctx.body = {
            code: 0,
            data: 1,
        };
    }
});

//创建下载任务
routers.post("/create1", async function (ctx) {
    await TaskReduce.createTask1(ctx.request.body);
    ctx.body = {
        code: 1,
    };
});
routers.post("/create2", function (ctx) {
    TaskReduce.createTask1(1);
    ctx.body = {
        code: 1,
    };
});
//获取任务列表
routers.get("/task", async function (ctx) {
    const list = await TaskModel.getAll();
    const data = [];
    if (list) {
        list.forEach((item) => {
            const runing = !!TaskReduce.getTask(item.id);
            data.push(
                Object.assign({}, item.dataValues, {
                    runing,
                })
            );
        });
    }
    ctx.body = {
        code: 1,
        data,
    };
});
//继续执行任务
routers.post("/goon", async function (ctx) {
    await TaskReduce.goon(ctx.request.body.id * 1);
    ctx.body = {
        code: 1,
    };
});
module.exports = routers.routes();
