import React from "react";
import request from "./utils/request";
import { Table, Button, Pagination, Message } from "element-react";

interface IState {
    list: any[];
    count: number;
}
export default class extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: [],
            count: 0,
        };
    }
    columns = [
        {
            label: "id",
            prop: "id",
            width: 50,
        },
        {
            label: "标题",
            prop: "title",
            width: 150,
        },
        {
            label: "当前页数",
            prop: "pageIndex",
            width: 100,
        },
        {
            label: "总页数",
            prop: "pageCount",
            width: 100,
        },
        {
            label: "状态",
            prop: "id",
            render: (row: any) => {
                if (row.runing) return "运行中";
                if (row.status == 0) return "已暂停";
                return "已结束";
            },
        },
        {
            label: "操作",
            prop: "id",
            render: (row: any) => {
                return (
                    <Button.Group>
                        <Button onClick={() => this.goon(row.id)} size="mini" type="primary">
                            继续执行
                        </Button>
                        {row.status == 1 && (
                            <Button size="mini" type="info">
                                下载结果
                            </Button>
                        )}
                        <Button onClick={() => this.del(row.id)} size="mini" type="danger">
                            删除
                        </Button>
                    </Button.Group>
                );
            },
        },
    ];
    render() {
        return (
            <div id="task_box">
                <h4>任务列表</h4>
                <div className="task_list">
                    {this.state.list.map((item) => (
                        <div key={item.id}></div>
                    ))}
                    <Table columns={this.columns} data={this.state.list} />
                </div>
                <div className="footer">
                    <Button onClick={() => this.getlist()}>刷新当前任务状态</Button>
                    <Pagination layout="prev, pager, next, total" total={this.state.count} pageSize={20} onCurrentChange={this.onCurrentChange} />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getlist();
    }
    pageIndex = 1;
    async getlist(pageIndex?: number) {
        if (pageIndex != undefined) {
            this.pageIndex = pageIndex;
        }
        const list = await request.get("/robot/task", { limit: this.pageIndex });
        this.setState({ list });
    }
    onCurrentChange = (currentPage: number) => {
        this.getlist(currentPage);
    };

    async goon(id: number) {
        try {
            await request.post("/robot/goon", { id });
            Message.success("任务已刷新");
        } catch (error) {
            Message.error(error.message);
        }
    }
    async del(id: number) {
        try {
            await request.post("/robot/del", { id });
            Message.success("已删除");
        } catch (error) {
            Message.error(error.message);
        }
    }
}
