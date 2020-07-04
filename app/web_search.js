const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const cookie_path = path.resolve(__dirname, "../cookie");

let cookie = "";

if (!fs.existsSync(cookie_path)) {
    fs.writeFileSync(cookie_path, "");
} else {
    cookie = fs.readFileSync(cookie_path, { encoding: "utf8" });
}

console.log("cookie", cookie);

function getHtml(url) {
    return axios({
        url: url,
        method: "get",
        headers: {
            Referer: "http://gys.1zu.com/cleaningWeek/initListCleaningWeekPlanItem.htm?source=init",
            Cookie: cookie,
        },
    });
}
//双周
// "http://gys.1zu.com/cleaningWeek/listCleaningWeekPlanItem.htm?dbType=&orderCode=&houseCode=&status=&cleaningWorkerName=&timeType=1&queryStartTime=&queryEndTime=&projectName=&isSmartLock=&onDoorStartTime=2020-07-03&onDoorEndTime=2020-07-03&isRework="
async function getlist1(params = "") {
    const res = await getHtml("http://gys.1zu.com/cleaningWeek/listCleaningWeekPlanItem.htm?" + params);
    const $ = cheerio.load(res.data);
    const pagecount = $(".searchPage .allPage").text();

    console.log("总x页", pagecount);
    console.log($(".searchPage .page-sum").text());
    const table = $("#tableSort tr");
    const list = [];
    table.each((item) => {
        const tmp = $(table[item]).find("td");
        //保洁工单编号
        const bianhao = tmp.eq(1).text().trim();
        //房源编号
        const bianhao2 = tmp.eq(2).text().trim();
        //小区名称
        const xiaoq = tmp.eq(3).text().trim();
        //预计保洁日期
        const yuji = tmp.eq(4).text().trim();
        //保洁人员
        const yuji5 = tmp.eq(5).text().trim();
        //预计上门时间
        const yuji6 = tmp.eq(6).text().trim();
        //保洁完成时间
        const yuji7 = tmp.eq(7).text().trim();
        //是否为返工单
        const yuji8 = tmp.eq(8).text().trim();
        //工单状态
        const status = tmp.eq(9).text().trim();
        console.log(bianhao, bianhao2, xiaoq);
        //TODO 增加字段
        list.push({
            status,
        });
    });
    return {
        list,
        count: pagecount,
    };
}
//日常
// "http://gys.1zu.com/commonCleaning/listCleaning.htm?dbType=&clnOrderId=&clnHouseCode=&clnOrderState=&cleaningWorkerName=&timeType=1&queryStartTime=&queryEndTime=&clnProjectName=&clnOrderType="
async function getlist2(params = "") {
    const res = await getHtml("http://gys.1zu.com/commonCleaning/listCleaning.htm?" + params);
    const $ = cheerio.load(res.data);
    const pagecount = $(".searchPage .allPage").text();

    console.log("总x页", pagecount);
    console.log($(".searchPage .page-sum").text());
    const table = $("#tableSort tr");
    const list = [];
    table.each((item) => {
        const tmp = $(table[item]).find("td");
        //保洁工单编号
        const bianhao = tmp.eq(1).text().trim();
        //房源编号
        const bianhao2 = tmp.eq(2).text().trim();
        //小区名称
        const xiaoq = tmp.eq(3).text().trim();
        //期望上门时间
        const yuji = tmp.eq(4).text().trim();
        //保洁套餐
        const yuji5 = tmp.eq(5).text().trim();
        //保洁人员
        const yuji6 = tmp.eq(6).text().trim();
        //预计上门时间
        const yuji7 = tmp.eq(7).text().trim();
        //保洁完成时间
        const yuji8 = tmp.eq(8).text().trim();
        //保洁单状态
        const status = tmp.eq(9).text().trim();
        console.log(bianhao, bianhao2, xiaoq);
        //TODO:字段
        list.push({
            status,
        });
    });
    return {
        list,
        count: pagecount,
    };
}
//双周详情
async function getDetail1(orderCode = "") {
    const res = await getHtml("http://gys.1zu.com/cleaningWeek/detailCleaningWeekPlanItem.htm?orderCode=" + orderCode);
    const $ = cheerio.load(res.data);
    const gongdan = $(".dePart").eq(1);

    //上门打开时间
    const shangmen = gongdan.find(".deTable td").eq(6).find("h5").text().trim();
    console.log(shangmen);
    const jieguo = $(".dePart").eq(3);

    //保洁完成
    const wanc = jieguo.find("td").eq(1).find("h5").text().trim();
    console.log(wanc);
    //保洁费用
    const feiyong = jieguo.find("td").eq(2).find("h5").text().trim();
    console.log(feiyong);
    return {
        wanc,
        feiyong,
    };
}
//日常详情
async function getDetail2(clnOrderId = "") {
    const res = await getHtml("http://gys.1zu.com/commonCleaning/detailCommonCleaning.htm?clnOrderId=" + clnOrderId);
    const $ = cheerio.load(res.data);
    const fangyuan = $(".dePart").eq(0);
    //经纪人
    const jingjiren = fangyuan.find("td").eq(4).find("h5").text().trim();
    console.log(jingjiren);
    //房屋面积
    const mianji = fangyuan.find("td").eq(6).find("h5").text().trim();
    console.log(mianji);

    const baojiedan = $(".dePart").eq(1);
    //保洁类型
    const baojieleixing = baojiedan.find("td").eq(1).find("h5").text().trim();
    console.log(baojieleixing);
    //预估费用
    const yugu = baojiedan.find("td").eq(2).find("h5").text().trim();
    console.log(yugu);
    //上门打卡时间
    const daka = baojiedan.find("td").eq(11).find("h5").text().trim();
    console.log(daka);
    return {
        jingjiren,
        mianji,
        baojieleixing,
        yugu,
        daka,
    };
}
async function isLogin() {
    const res = await getHtml("http://gys.1zu.com/admin/login.htm");
    const html = res.data;
    if (html.indexOf("立即登录") > 0) {
        return false;
    } else {
        return true;
    }
}
//登录
async function login(username, password, checkCode) {
    const res = await axios({
        url: "http://gys.1zu.com/admin/login.htm",
        method: "POST",
        headers: {
            Referer: "http://gys.1zu.com/admin/login.htm",
            Cookie: cookie,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: `username=${username}&password=${password}&checkCode=${checkCode}`,
    });
    const html = res.data;
    if (html.indexOf("立即登录") > 0) {
        console.log(res.data);
        return false;
    } else {
        let cookie_tmp = "";
        const list = res.headers["set-cookie"];
        list.forEach((item) => {
            const tmp = item.split(";")[0];
            cookie_tmp += tmp + ";";
        });
        setCookie(cookie_tmp);
        return true;
    }
}
function setCookie(data) {
    cookie = data;
    fs.writeFileSync(cookie_path, cookie);
}
//1022000000
module.exports = {
    isLogin,
    setCookie,
    getDetail1,
    getDetail2,
    getlist1,
    getlist2,
    login,
};
