const ipcRenderer = require("electron").ipcRenderer;

const loginDom = document.getElementById("login");
const footerDom = document.getElementById("footer");
const contentsDom = document.getElementById("contents");

ipcRenderer.on("test2", function (e, data) {
    console.log(data);
});
// //登录
// ipcRenderer.on("login", function (e, data) {
//     loginDom.style.display = "block";
//     footerDom.style.display = "none";
// });
// //展示首页
// ipcRenderer.on("show", function (e, data) {
//     console.log("show");
//     contentsDom.style.display = "block";
// });
ipcRenderer.on("download", function (e, pageindex, pagecount) {
    console.log("正在下载", pageindex, pagecount);
});
$(function () {
    $("#logout").click(function () {
        ipcRenderer.send("logout");
    });
    $("#menu1").click(function () {
        $("#list1").show();
        $("#list2").hide();
    });
    $("#menu2").click(function () {
        $("#list2").show();
        $("#list1").hide();
    });
    $("#select_path1").click(function () {
        // 创建input标签
        var inputObj = document.createElement("input"); // 设置属性
        inputObj.setAttribute("id", "_ef");
        inputObj.setAttribute("type", "file");
        inputObj.setAttribute("style", "visibility:hidden");
        // 如果要选择路径，则添加以下两个属性
        inputObj.setAttribute("webkitdirectory", "");
        inputObj.setAttribute("directory", "");
        document.body.appendChild(inputObj); // 添加事件监听器
        inputObj.addEventListener("change", uploadPath1); // 模拟点击
        inputObj.click();
    });
});

function uploadPath1() {
    var inputObj = document.getElementById("_ef");
    var files = inputObj.files;
    inputObj.removeEventListener("change", uploadPath1);
    document.body.removeChild(inputObj);
    if (!files || files.length === 0) return;
    const path1 = files[0].path;
    console.log(path1);
    const path2 = path1.substring(0, path1.lastIndexOf("/") + 1);
    let params = "dbType=";
    const orderCode = $("#orderCode").val() || "";
    params += "&orderCode=" + orderCode;
    const houseCode = $("#houseCode").val() || "";
    params += "&houseCode=" + houseCode;
    const status = $("#status").val() || "";
    params += "&status=" + status;
    const cleaningWorkerName = $("#cleaningWorkerName").val() || "";
    params += "&cleaningWorkerName=" + cleaningWorkerName;
    const timeType = $("#timeType").val() || "";
    params += "&timeType=" + timeType;
    const queryStartTime = $("#queryStartTime").val() || "";
    params += "&queryStartTime=" + queryStartTime;
    const queryEndTime = $("#queryEndTime").val() || "";
    params += "&queryEndTime=" + queryEndTime;
    const projectName = $("#projectName").val() || "";
    params += "&projectName=" + projectName;
    const isSmartLock = $("#isSmartLock").val() || "";
    params += "&isSmartLock=" + isSmartLock;
    const onDoorStartTime = $("#onDoorStartTime").val() || "";
    params += "&onDoorStartTime=" + onDoorStartTime;
    const onDoorEndTime = $("#onDoorEndTime").val() || "";
    params += "&onDoorEndTime=" + onDoorEndTime;
    const isRework = $("#isRework").val();
    params += "&isRework=" + isRework;

    ipcRenderer.send("upload1", path2, params);
}
