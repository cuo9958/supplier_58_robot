import React from "react";
import request from "./utils/request";
import { Button } from "element-react";

interface IModel {
    [index: string]: string;
    clnOrderId: string;
    clnHouseCode: string;
    clnOrderState: string;
    cleaningWorkerName: string;
    timeType: string;
    queryStartTime: string;
    queryEndTime: string;
    clnProjectName: string;
    clnOrderType: string;
}
interface IState {
    model: IModel;
}

export default class extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            model: {
                clnOrderId: "",
                clnHouseCode: "",
                clnOrderState: "",
                cleaningWorkerName: "",
                timeType: "",
                queryStartTime: "",
                queryEndTime: "",
                clnProjectName: "",
                clnOrderType: "",
            },
        };
    }
    render() {
        return (
            <div id="list1">
                <h4>日常保洁订单查询</h4>
                <div className="ppm">
                    <input id="clnOrderId" onChange={(e) => this.setModel("clnOrderId", e)} placeholder="保洁工单编号" className="form-control" />
                    <input id="clnHouseCode" onChange={(e) => this.setModel("clnHouseCode", e)} placeholder="房源编号" className="form-control" />
                    <select className="formSelect joint" onChange={(e) => this.setModel("clnOrderState", e)} name="clnOrderState" id="clnOrderState">
                        <option value="">请选择</option>
                        <option value="1001100010006">待派工</option>
                        <option value="1001100010012">待上门</option>
                        <option value="1001100010013">保洁中</option>
                        <option value="1001100010008">保洁完成</option>
                        <option value="1001100010007">已取消</option>
                    </select>
                    <input id="cleaningWorkerName" onChange={(e) => this.setModel("cleaningWorkerName", e)} placeholder="保洁人员" className="form-control" />
                </div>
                <div>
                    <select className="formSelect joint" onChange={(e) => this.setModel("timeType", e)} name="timeType" id="timeType">
                        <option value="1" selected>
                            期望上门时间
                        </option>
                        <option value="2">预计上门时间</option>
                        <option value="3">保洁完成时间</option>
                    </select>
                    <input id="queryStartTime" onChange={(e) => this.setModel("queryStartTime", e)} placeholder="开始日期" className="form-control" />
                    <input id="queryEndTime" onChange={(e) => this.setModel("queryEndTime", e)} placeholder="结束日期" className="form-control" />
                    <input id="clnProjectName" onChange={(e) => this.setModel("clnProjectName", e)} placeholder="小区名称" className="form-control" />
                    <select className="formSelect joint" onChange={(e) => this.setModel("clnOrderType", e)} name="clnOrderType" id="clnOrderType">
                        <option value="">请选择</option>
                        <option value="10011000300010001">普通保洁</option>
                        <option value="10011000300010002">深度保洁</option>
                        <option value="10011000300010003">双周保洁</option>
                        <option value="10011000300010004">开荒保洁</option>
                        <option value="10011000300010005">整套空气治理</option>
                        <option value="10011000300010006">单间空气治理</option>
                        <option value="10011000300010007">空气检测</option>
                        <option value="10011000300010009">整套空气治理(含检测费用)</option>
                        <option value="10011000300010008">单间空气治理(含检测费用)</option>
                        <option value="10011000300010010">空气检测</option>
                    </select>
                </div>
                <Button onClick={() => this.createTask()}>新建查询任务</Button>
            </div>
        );
    }
    setModel(key: string, e: any) {
        const model = this.state.model;
        model[key] = e.target.value;
        this.setState({ model });
    }
    async createTask() {
        const data = await request.post("/robot/create2", this.state.model);
        alert("已提交");
    }
}
