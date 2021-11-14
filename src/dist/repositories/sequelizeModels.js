"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupUser = exports.GroupModel = exports.UserModel = exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
var models_1 = require("../models");
exports.sequelize = new sequelize_1.Sequelize(process.env.PSQLConnectionString);
;
exports.UserModel = exports.sequelize.define('User', {
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    login: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'Users',
    indexes: [{ fields: ['id', 'login'] }],
    timestamps: false,
});
;
exports.GroupModel = exports.sequelize.define('Group', {
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    permissions: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.ENUM({
            values: __spreadArray([], models_1.Permissions, true),
        })),
    }
}, {
    tableName: 'Groups',
    indexes: [{ fields: ['id', 'name'] }],
    timestamps: false,
});
exports.GroupUser = exports.sequelize.define('GroupUsers', {
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
exports.GroupModel.belongsToMany(exports.UserModel, { through: "GroupUsers" });
exports.UserModel.belongsToMany(exports.GroupModel, { through: "GroupUsers" });
