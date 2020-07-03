const Router = require("koa-router");
const axios = require("axios");
const TaskReduce = require("./task");
const WebSearch = require("./web_search");

const routers = new Router();

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
//是否登录
routers.get("/islogin", async function (ctx) {
    const data = await WebSearch.isLogin();
    ctx.body = {
        code: 1,
        data,
    };
});
//创建下载任务
routers.post("/create", function (ctx) {
    TaskReduce.createTask(1);
    ctx.body = {
        code: 1,
    };
});
//获取任务详情
routers.get("/task", function (ctx) {
    TaskReduce.createTask(1);
    ctx.body = {
        code: 1,
    };
});
module.exports = routers.routes();
