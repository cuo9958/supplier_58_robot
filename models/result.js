const Sequelize = require("sequelize");
const db = require("../db/mysql");

const Result = db.define(
    "t_result",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        task_id: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            comment: "任务id",
        },
        task_type: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
            comment: "类型",
        },
        bianhao1: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "保洁工单编号",
        },
        bianhao2: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "房源编号",
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "小区名称",
        },
        renyuan: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "保洁人员",
        },
        riqi2: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "预计上门时间",
        },
        riqi3: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "保洁完成时间",
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "工单状态",
        },
        //=============双周
        riqi1: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "预计保洁日期",
        },
        fangong: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "是否为返工单",
        },
        //===
        riqi4: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "上门打开时间",
        },
        riqi5: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "保洁完成时间",
        },
        feiyong: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "保洁费用",
        },
        xiaoqu: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "小区信息",
        },
        zukelist: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "租客列表",
        },
        //=================日常的字段
        qiwang: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "期望上门时间",
        },
        taocan: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "保洁套餐",
        },
        mianji: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "房屋面积",
        },
        jingji: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "经济人",
        },
        baojieleixing: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "保洁类型",
        },
        shangmen: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "上门打卡时间",
        },
        wanc: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "保洁完成时间",
        },
        yugu: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "保洁预估费用",
        },
        feiyong2: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "保洁费用",
        },
        luru: {
            type: Sequelize.STRING,
            defaultValue: "",
            comment: "保洁费用",
        },
    },
    {
        freezeTableName: true,
    }
);

//强制初始化数据库
// Result.sync({ force: true });

module.exports = {
    insert: function (model) {
        return Result.create(model);
    },
    update: function (model) {
        return Result.update(model, {
            where: {
                id: model.id,
            },
        });
    },
    get: function (id) {
        return Result.findOne({
            where: {
                id,
            },
        });
    },
    getAll(task_id) {
        return Result.findAll({
            where: {
                task_id,
            },
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
        return Result.findAndCountAll(config);
    },
    change: function (status, id) {
        const model = {
            status,
        };
        return Result.update(model, {
            where: {
                id,
            },
        });
    },
};
