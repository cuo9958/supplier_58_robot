import React from "react";
import request from "./utils/request";

//orderCode 保洁工单编号
//houseCode 房源编号
//status    保洁工单状态
//cleaningWorkerName    保洁人员
//timeType=1    日期类型，1预计保洁日期2预计上门时间3保洁完成时间
//queryStartTime    预计保洁日期
//queryEndTime
//projectName   小区名称
//isSmartLock   是否为智能锁房源 Y N
//onDoorStartTime   上门打卡时间
//onDoorEndTime
//isRework  是否为返工单 1 0
interface IModel {
    [index: string]: string;
    orderCode: string;
    houseCode: string;
    status: string;
    cleaningWorkerName: string;
    timeType: string;
    queryStartTime: string;
    queryEndTime: string;
    projectName: string;
    isSmartLock: string;
    onDoorStartTime: string;
    onDoorEndTime: string;
    isRework: string;
}
interface IState {
    model: IModel;
}
export default class extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            model: {
                orderCode: "",
                houseCode: "",
                status: "",
                cleaningWorkerName: "",
                timeType: "1",
                queryStartTime: "",
                queryEndTime: "",
                projectName: "",
                isSmartLock: "",
                onDoorStartTime: "",
                onDoorEndTime: "",
                isRework: "",
            },
        };
    }
    render() {
        return (
            <div id="list1">
                <h4>双周订单查询</h4>
                <div className="ppm">
                    <input id="orderCode" onChange={(e) => this.setModel("orderCode", e)} placeholder="保洁工单编号" className="form-control" />
                    <input id="houseCode" onChange={(e) => this.setModel("houseCode", e)} placeholder="房源编号" type="text" className="form-control" />
                    <select id="status" onChange={(e) => this.setModel("status", e)} className="form-control">
                        <option value="">请选择</option>
                        <option value="1003400020001">待派工</option>
                        <option value="1003400020002">待上门</option>
                        <option value="1003400020003">保洁中</option>
                        <option value="1003400020004">保洁完成</option>
                        <option value="1003400020005">已取消</option>
                    </select>
                    <input id="cleaningWorkerName" onChange={(e) => this.setModel("cleaningWorkerName", e)} placeholder="保洁人员" type="text" className="form-control" />
                </div>
                <div className="ppm">
                    <select id="timeType" onChange={(e) => this.setModel("timeType", e)} className="form-control">
                        <option value="1">预计保洁日期</option>
                        <option value="2">预计上门时间</option>
                        <option value="3">保洁完成时间</option>
                    </select>
                    <input id="queryStartTime" onChange={(e) => this.setModel("queryStartTime", e)} placeholder="预计日期开始部分" type="text" className="form-control" />
                    <input id="queryEndTime" onChange={(e) => this.setModel("queryEndTime", e)} placeholder="预计日期结束部分" type="text" className="form-control" />
                    <input id="projectName" onChange={(e) => this.setModel("projectName", e)} placeholder="小区名称" type="text" className="form-control" />
                    <select id="isSmartLock" onChange={(e) => this.setModel("isSmartLock", e)} className="form-control">
                        <option value="">请选择</option>
                        <option value="Y">是智能锁房源</option>
                        <option value="N">否</option>
                    </select>
                    <input id="onDoorStartTime" onChange={(e) => this.setModel("onDoorStartTime", e)} placeholder="上门打卡时间-开始" type="text" className="form-control" />
                    <input id="onDoorEndTime" onChange={(e) => this.setModel("onDoorEndTime", e)} placeholder="上门打卡时间-结束" type="text" className="form-control" />
                    <select id="isRework" onChange={(e) => this.setModel("isRework", e)} className="form-control">
                        <option value="">请选择</option>
                        <option value="1">是返工单</option>
                        <option value="0">否</option>
                    </select>
                </div>
                <button onClick={() => this.create()}>新建查询任务</button>
            </div>
        );
    }
    setModel(key: string, e: any) {
        const model = this.state.model;
        model[key] = e.target.value;
        this.setState({ model });
    }
    async create() {
        const data = await request.post("/robot/create1", this.state.model);
        alert("已提交");
    }
}
