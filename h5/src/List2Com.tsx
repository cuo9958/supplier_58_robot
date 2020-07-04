import React from "react";
import request from "./utils/request";

export default class extends React.Component {
    render() {
        return (
            <div id="list1">
                <h4>日常保洁订单查询</h4>
                <div className="ppm">
                    <input id="orderCode" placeholder="保洁工单编号" className="form-control" />
                </div>
                <button>新建查询任务</button>
            </div>
        );
    }
}
