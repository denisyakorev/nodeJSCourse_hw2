"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupUser = void 0;
var sequelize_1 = require("sequelize");
var connect_1 = require("./connect");
var group_1 = require("./group");
var user_1 = require("./user");
exports.GroupUser = connect_1.sequelize.define('GroupUsers', {
    GroupId: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
    },
    UserId: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
    }
}, {
    tableName: 'GroupUsers',
    indexes: [{ fields: ['GroupId', 'UserId'] }],
});
group_1.GroupModel.belongsToMany(user_1.UserModel, { through: "GroupUsers" });
user_1.UserModel.belongsToMany(group_1.GroupModel, { through: "GroupUsers" });
