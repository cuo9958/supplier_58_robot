import React from "react";
import "./App.css";
import request from "./utils/request";

class Main extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            needLogin: false,
        };
    }
    render() {
        return (
            <div className="container">
                <div id="login">
                    <h4>登录</h4>
                    <input />
                    <input />
                    <img src="" alt="" />
                    <button>登录</button>
                </div>
            </div>
        );
    }
    componentDidMount() {
        // this.isLogin();
    }
    async isLogin() {
        const res = await request.get("/robot/islogin");
        console.log(res);
        this.setState({
            needLogin: !res,
        });
    }
}

export default Main;
