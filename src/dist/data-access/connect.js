"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
var connectionString = process.env.PSQLConnectionString || '';
exports.sequelize = new sequelize_1.Sequelize(connectionString);
