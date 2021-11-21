"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_express_utils_1 = require("inversify-express-utils");
var express = require('express');
require("./ioc/loader");
var inversify_1 = require("inversify");
var services_1 = require("./services");
var types_1 = require("./constants/types");
var groupRepository_1 = require("./data-access/groupRepository");
var userRepository_1 = require("./data-access/userRepository");
var methodLogger_1 = require("./middlewares/methodLogger");
var errorHandlers_1 = require("./middlewares/errorHandlers");
var container = new inversify_1.Container();
container.bind(types_1.TYPES.IGroupService).to(services_1.groupService);
container.bind(types_1.TYPES.IGroupRepository).to(groupRepository_1.groupRepository);
container.bind(types_1.TYPES.IUserService).to(services_1.userService);
container.bind(types_1.TYPES.IUserRepository).to(userRepository_1.userRepository);
var server = new inversify_express_utils_1.InversifyExpressServer(container);
server.setConfig(function (theApp) {
    theApp.use(express.json());
    theApp.use(methodLogger_1.methodLogger);
    theApp.use(errorHandlers_1.errorHandlers);
});
var app = server.build();
var port = 3000;
app.listen(port, function () { return console.log("Server started on port " + port); });
process.on('uncaughtException', function (err, origin) {
    errorHandlers_1.logger.error("Error in process.on uncaughtException: " + err);
});
process.on('unhandledRejection', function (err, origin) {
    errorHandlers_1.logger.error("Error in process.on unhandledRejection: " + err);
});
exports = module.exports = app;
