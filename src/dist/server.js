"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_express_utils_1 = require("inversify-express-utils");
var express = require('express');
var cors_1 = __importDefault(require("cors"));
require("./ioc/loader");
var inversify_1 = require("inversify");
var services_1 = require("./services");
var types_1 = require("./constants/types");
var group_1 = require("./data-access/group");
var user_1 = require("./data-access/user");
var methodLogger_1 = require("./middlewares/methodLogger");
var errorHandlers_1 = require("./middlewares/errorHandlers");
var container = new inversify_1.Container();
container.bind(types_1.TYPES.IGroupService).to(services_1.groupService);
container.bind(types_1.TYPES.IGroupRepository).to(group_1.GroupDAO);
container.bind(types_1.TYPES.IUserService).to(services_1.userService);
container.bind(types_1.TYPES.IUserRepository).to(user_1.UserDAO);
var server = new inversify_express_utils_1.InversifyExpressServer(container);
server.setConfig(function (theApp) {
    theApp.use((0, cors_1.default)());
    theApp.use(express.json());
    theApp.use(methodLogger_1.methodLogger);
});
var app = server.build();
var port = 3000;
app.listen(port, function () { return console.log("Server started on port " + port); });
app.use(errorHandlers_1.errorHandlers);
process.on('uncaughtException', function (err, origin) {
    errorHandlers_1.logger.error("Error in process.on uncaughtException: " + err);
});
process.on('unhandledRejection', function (err, origin) {
    errorHandlers_1.logger.error("Error in process.on unhandledRejection: " + err);
});
exports = module.exports = app;
