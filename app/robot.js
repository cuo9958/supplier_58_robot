const Router = require("koa-router");
const axios = require("axios");
const TaskReduce = require("./task");

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
    const res = await getHtml("http://gys.1zu.com/admin/login.htm");
    if (res.status !== 200) {
        console.log("接口失败");
        return false;
    }
    const html = res.data;
    if (html.indexOf("立即登录") > 0) {
        console.log("需要登录");
        return false;
    } else {
        return true;
    }

    ctx.body = {
        code: 1,
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

module.exports = routers.routes();
