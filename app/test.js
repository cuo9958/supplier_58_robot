const async = require("async");
const axios = require("axios");

async function getlist(item) {
    console.log("请求", item);
    const res = await axios({
        url: "https://dalingjia.com/api_config/resource/shop",
    });
    console.log("请求结果", item, res.data.data.openHxIM);
    await sleep(1000);
    return res.data.data.openHxIM;
}
async function main() {
    const data = await async.mapLimit([1, 3, 4, 5, 6], 2, getlist);
    console.log(data);
}

const sleep = (time) => new Promise((aaa) => setTimeout(() => aaa(), time));

// async function test2(n, next) {
//     console.log("测试", n);
//     await sleep(1000);
//     next();
// }
// async function main() {
//     const data = await async.times(5, test2);
//     console.log("结果", data);
// }
main();
