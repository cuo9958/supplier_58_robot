const { CronJob } = require("cron");
const TaskModel = require("../models/task");
const WebSearch = require("./web_search");
const async = require("async");
const ResultModel = require("../models/result");

const task_list = new Map();

class TaskRobot {
    constructor(id, params) {
        this.id = id;
        this.params = params;
        this.pageIndex = 0;
        this.timer = null;
    }
    async run1() {
        this.timer = new CronJob("*/20 * * * * *", this.search.bind(this)).start();
    }
    run2() {}
    //currentPage
    async search() {
        const model = await TaskModel.get(this.id);
        this.pageIndex = model.pageIndex + 1;
        if (this.pageIndex <= model.pageCount) {
            await TaskModel.update({ pageIndex: this.pageIndex }, this.id);
            const listdata = await WebSearch.getlist1(this.params + "&currentPage=" + this.pageIndex);
            console.log(listdata.list)
            await async.mapLimit(listdata.list, 2, this.getDetail1.bind(this));
        } else {
            TaskModel.end(this.id);
            if (this.timer) this.timer.stop();
            task_list.delete(this.id);
        }
    }
    //请求详情页
    async getDetail1(item) {
        const data = await WebSearch.getDetail1(item.bianhao1);
        const model = Object.assign(
            {
                task_id: this.id,
                task_type: 0,
            },
            item,
            data
        );
        ResultModel.insert(model);
    }
}

module.exports = {
    createTask1: async function (data) {
        if (!data) return;
        const {
            orderCode,
            houseCode,
            status,
            cleaningWorkerName,
            timeType,
            queryStartTime,
            queryEndTime,
            projectName,
            isSmartLock,
            onDoorStartTime,
            onDoorEndTime,
            isRework,
        } = data;
        const search_str = `dbType=&orderCode=${orderCode}&houseCode=${houseCode}&status=${status}&cleaningWorkerName=${cleaningWorkerName}&timeType=${timeType}&queryStartTime=${queryStartTime}&queryEndTime=${queryEndTime}&projectName=${projectName}&isSmartLock=${isSmartLock}&onDoorStartTime=${onDoorStartTime}&onDoorEndTime=${onDoorEndTime}&isRework=${isRework}&pageSize=20`;
        const pageResult = await WebSearch.getlist1(search_str + "&currentPage=1");

        const model = await TaskModel.insert({
            title: "双周保洁查询",
            task_type: 0,
            search_str,
            pageCount: pageResult.count,
        });

        const task = new TaskRobot(model.id, search_str);
        task.run1();
        task_list.set(model.id, task);
        return task;
    },
    getTaskList() {
        return task_list;
    },
    getTask(id) {
        return task_list.get(id);
    },
    async goon(id) {
        const model = await TaskModel.get(id);
        const task = new TaskRobot(model.id, model.search_str);
        if (model.task_type === 0) {
            task.run1();
        } else {
            task.run2();
        }
        task_list.set(model.id, task);
        return task;
    },
};
