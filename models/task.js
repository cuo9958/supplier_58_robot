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
        pageCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            comment: "总页数",
        },
        status: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
            comment: "状态;0:进行中;1:结束",
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
    update: function (model, id) {
        return Task.update(model, {
            where: {
                id,
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
    end(id) {
        return Task.update({ status: 1 }, { where: { id } });
    },
    getAll() {
        return Task.findAll({
            limit: 20,
            order: [["id", "desc"]],
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
