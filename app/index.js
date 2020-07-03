const Koa = require("koa");
const KoaBody = require("koa-body");
const Router = require("koa-router");

const app = new Koa();
const routers = new Router();

app.use(
    KoaBody({
        multipart: true,
        formLimit: "5mb",
    })
);

routers.use("/api/robot", require("./robot"));

//加载路由
app.use(routers.routes()).use(routers.allowedMethods());

const port = process.env.PORT || "18801";

app.listen(port, function () {
    console.log(`服务器运行在http://127.0.0.1:${port}`);
});
