const async = require("async");
const axios = require("axios");

async function getlist(item) {
    console.log("请求", item);
    const res = await axios({
        url: "https://dalingjia.com/api_config/resource/shop",
    });
    console.log("请求结果", item, res.data.data.openHxIM);
    return res.data.data.openHxIM;
}
async function main() {
    const data = await async.mapLimit([1, 3, 4, 5, 6], 2, getlist);
    console.log(data);
}

main();
