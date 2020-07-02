const ipcRenderer = require("electron").ipcRenderer;
const loginDom = document.getElementsByClassName("login_box");
if (loginDom.length === 0) {
    ipcRenderer.send("login");
}
function login() {
    var j_username = $("#username").val().trim();
    var j_password = $("#password").val().trim();
    var j_code = $("#j_code").val();
    if (j_username == "") {
        document.getElementById("error").innerText = "请输入员工编号";
        return false;
    }
    if (j_password == "") {
        document.getElementById("error").innerText = "请输入登录密码";
        return false;
    }

    if (!inputCheck(j_username)) {
        return false;
    }

    document.getElementById("loginForm").action = "http://gys.1zu.com/admin/login.htm";
    document.getElementById("loginForm").submit();
}