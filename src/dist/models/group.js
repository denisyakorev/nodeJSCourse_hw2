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
exports.GroupModel = void 0;
var sequelize_1 = require("sequelize");
var dto_1 = require("../dto");
var connect_1 = require("../config/connect");
;
exports.GroupModel = connect_1.sequelize.define('Group', {
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
            values: __spreadArray([], dto_1.Permissions, true),
        })),
    }
}, {
    tableName: 'Groups',
    indexes: [{ fields: ['id', 'name'] }],
    timestamps: false,
});
