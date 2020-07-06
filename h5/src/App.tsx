import React from "react";
import "./App.css";
import request from "./utils/request";
import LoginCom from "./LoginCom";
import List1Com from "./List1Com";
import List2Com from "./List2Com";
import TaskList from "./TaskList";
import { Message } from "element-react";

interface IState {
    needLogin: boolean;
}
class Main extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            needLogin: false,
        };
    }
    render() {
        return (
            <div className="container">
                {this.state.needLogin && <LoginCom onLogin={(e) => this.login(e)} />}
                <List1Com />
                <List2Com />
                <TaskList />
            </div>
        );
    }
    componentDidMount() {
        this.isLogin();
    }
    async isLogin() {
        try {
            const res = await request.get("/robot/islogin");
            this.setState({
                needLogin: !res,
            });
        } catch (error) {
            Message.error("服务器已经被封，稍等2个小时解封");
        }
    }
    login(bl: boolean) {
        this.setState({
            needLogin: bl,
        });
    }
}

export default Main;
