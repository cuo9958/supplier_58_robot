const xlsx = require("node-xlsx");

function parseOneXlsx(buf) {
    const result = xlsx.parse(buf);
    return result[0];
}
//假设第一行是标题
function arrToJson(list) {
    if (list.length < 2) return [];
    let res = [];
    const title = list.shift();
    if (!title) return [];
    list.forEach((item) => {
        let temp = {};
        for (let index = 0; index < item.length; index++) {
            if (title[index]) temp[title[index]] = item[index];
        }
        res.push(temp);
    });
    return res;
}

function arrToBuff(list) {
    return xlsx.build([{ name: "mySheetName", data: list }]); // Returns a buffer
}
module.exports = {
    parseOneXlsx,
    arrToJson,
    arrToBuff,
};
