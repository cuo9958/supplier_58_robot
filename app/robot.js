const Router = require("koa-router");
const axios = require("axios");
const TaskReduce = require("./task");
const WebSearch = require("./web_search");
const TaskModel = require("../models/task");
const Excel = require("./excel");
const ResultModel = require("../models/result");

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
routers.post("/create2", async function (ctx) {
    await TaskReduce.createTask2(ctx.request.body);
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
routers.post("/del", async function (ctx) {
    const id = ctx.request.body.id;
    if (!id || isNaN(id)) {
        ctx.body = {
            code: 0,
        };
    } else {
        await TaskModel.del(id * 1);
        TaskReduce.del(id * 1);
        ctx.body = {
            code: 1,
        };
    }
});
routers.get("/download/:id", async function (ctx) {
    const id = ctx.params.id;
    const list = await ResultModel.getAll(id * 1);
    const mp = [];
    if (list.length > 0) {
        if (list[0].task_type == 0) {
            mp.push([
                "保洁工单编号",
                "房源编号",
                "小区名称",
                "保洁人员",
                "预计上门时间",
                "保洁完成时间",
                "工单状态",
                "预计保洁日期",
                "是否为返工单",
                "上门打卡时间",
                "保洁完成时间",
                "保洁费用",
            ]);
            list.forEach((item) => {
                mp.push([
                    item.bianhao1,
                    item.bianhao2,
                    item.name,
                    item.renyuan,
                    item.riqi2,
                    item.riqi3,
                    item.status,
                    item.riqi1,
                    item.fangong,
                    item.riqi4,
                    item.riqi5,
                    item.feiyong,
                ]);
            });
        } else {
            mp.push([
                "保洁工单编号",
                "房源编号",
                "小区名称",
                "保洁人员",
                "预计上门时间",
                "保洁完成时间",
                "工单状态",
                "期望上门时间",
                "保洁套餐",
                "房屋面积",
                "经济人",
                "保洁类型",
                "上门打卡时间",
                "保洁完成时间",
                "保洁预估费用",
                "保洁费用",
            ]);
            list.forEach((item) => {
                mp.push([
                    item.bianhao1,
                    item.bianhao2,
                    item.name,
                    item.renyuan,
                    item.riqi2,
                    item.riqi3,
                    item.status,
                    item.qiwang,
                    item.taocan,
                    item.mianji,
                    item.jingji,
                    item.mianji,
                    item.shangmen,
                    item.wanc,
                    item.yugu,
                    item.feiyong2,
                ]);
            });
        }
    }

    const buf = Excel.arrToBuff(mp);
    ctx.set("content-type", "application/vnd.ms-excel");
    ctx.set("content-Disposition", `attachment;filename=baojiegongdan.xlsx`);
    ctx.body = buf;
});
module.exports = routers.routes();
