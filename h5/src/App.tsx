import React from "react";
import "./App.css";
import request from "./utils/request";
import LoginCom from "./LoginCom";
import List1Com from "./List1Com";
import List2Com from "./List2Com";
import TaskList from "./TaskList";

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
        const res = await request.get("/robot/islogin");
        console.log(res);
        this.setState({
            needLogin: !res,
        });
    }
    login(bl: boolean) {
        this.setState({
            needLogin: bl,
        });
    }
}

export default Main;
