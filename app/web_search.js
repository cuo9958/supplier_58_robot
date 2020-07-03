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

// console.log("cookie", cookie);

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

async function getlist1() {
    // const res = await getHtml(
    //     "http://gys.1zu.com/cleaningWeek/listCleaningWeekPlanItem.htm?dbType=&orderCode=&houseCode=&status=&cleaningWorkerName=&timeType=1&queryStartTime=&queryEndTime=&projectName=&isSmartLock=&onDoorStartTime=2020-07-03&onDoorEndTime=2020-07-03&isRework="
    // );
    // const $ = cheerio.load(res.data);
    const $ = cheerio.load(fs.readFileSync(path.resolve(__dirname, "../test.html")));
    const pagecount = $(".searchPage .allPage").text();

    console.log("总x页", pagecount);
    console.log($(".searchPage .page-sum").text());
    const table = $("#tableSort tr");
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
        //预计上门时间
        //保洁完成时间
        //是否为返工单
        //工单状态
        console.log(bianhao, bianhao2, xiaoq);
    });
}
getlist1();
//1022000000
module.exports = {
    setCookie(data) {
        cookie = data;
        fs.writeFileSync(cookie_path, cookie);
    },
};
