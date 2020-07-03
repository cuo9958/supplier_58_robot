const { CronJob } = require("cron");

const task_list = new Map();

class TaskRobot {
    constructor(id) {
        this.id = id;
        this.result = [];
    }
    run() {
        new CronJob("*/5 * * * * *", this.search.bind(this)).start();
    }
    search() {
        console.log(this.result);
        this.result.push(Math.random());
    }
}

module.exports = {
    createTask: function (id) {
        const task = new TaskRobot(id);
        task.run();
        task_list.set(id, task);
        return task;
    },
    getTaskList() {
        return task_list;
    },
    getTask(id) {
        return task_list.get(id);
    },
};
