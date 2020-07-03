const Sequelize = require("sequelize");
const db = require("../db/mysql");

const Task = db.define(
    "t_task",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "标题",
        },
        key: {
            type: Sequelize.STRING(20),
            defaultValue: "",
            comment: "key值",
        },
        task_type: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
            comment: "搜索类型,0,1",
        },
        search_str: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "搜索参数",
        },
        search_data: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "搜索结果地址",
        },
        pageIndex: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            comment: "搜索当前页",
        },
        status: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
            comment: "状态;0:失效;1:使用",
        },
    },
    {
        freezeTableName: true,
    }
);

//强制初始化数据库
// Task.sync({ force: true });

module.exports = {
    insert: function (model) {
        return Task.create(model);
    },
    update: function (model) {
        return Task.update(model, {
            where: {
                id: model.id,
            },
        });
    },
    get: function (id) {
        return Task.findOne({
            where: {
                id,
            },
        });
    },
    getAll() {
        return Task.findAll({
            where: {
                status: 1,
            },
            attributes: ["id", "title", "key"],
        });
    },
    getCount(limit = 1, opts = {}) {
        let config = {
            limit: 20,
            offset: (limit - 1) * 20,
            order: [
                ["status", "desc"],
                ["id", "desc"],
            ],
        };
        return Task.findAndCountAll(config);
    },
    change: function (status, id) {
        const model = {
            status,
        };
        return Task.update(model, {
            where: {
                id,
            },
        });
    },
};
