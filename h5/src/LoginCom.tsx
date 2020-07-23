import React from "react";
import request from "./utils/request";

interface IloginModel {
    [index: string]: string;
    username: string;
    password: string;
    checkCode: string;
}
interface IState {
    loginModel: IloginModel;
    codeUrl: string;
}
interface IProps {
    onLogin(bl: boolean): void;
}
export default class extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            codeUrl: "/api/robot/code",
            loginModel: {
                username: "1023000000",
                password: "",
                checkCode: "",
            },
        };
    }
    render() {
        return (
            <div id="login">
                <h4>登录</h4>
                <input name="username" value={this.state.loginModel.username} onChange={(e) => this.setInputLogin("username", e)} placeholder="账号" />
                <input name="password" onChange={(e) => this.setInputLogin("password", e)} placeholder="密码" />
                <input name="checkcode" onChange={(e) => this.setInputLogin("checkCode", e)} placeholder="验证码" />
                <img onClick={() => this.refreshCode()} src={this.state.codeUrl} alt="" />
                <button onClick={() => this.login()}>登录</button>
            </div>
        );
    }

    refreshCode() {
        this.setState({
            codeUrl: "/api/robot/code?t=" + Date.now(),
        });
    }
    async login() {
        try {
            await request.post("/robot/login", this.state.loginModel);
            this.props.onLogin(true);
        } catch (error) {
            alert("登录失败");
        }
    }
    setInputLogin(key: string, e: any) {
        const model = this.state.loginModel;
        model[key] = e.target.value;
        this.setState({ loginModel: model });
    }
}
