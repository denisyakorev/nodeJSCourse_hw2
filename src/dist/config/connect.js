"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
var config_1 = require("./config");
exports.sequelize = new sequelize_1.Sequelize(config_1.config.dbConnectionString);
