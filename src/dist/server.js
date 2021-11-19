"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_express_utils_1 = require("inversify-express-utils");
var express = require('express');
require("./ioc/loader");
var inversify_1 = require("inversify");
var container = new inversify_1.Container();
var server = new inversify_express_utils_1.InversifyExpressServer(container);
server.setConfig(function (theApp) {
    theApp.use(express.json());
});
var app = server.build();
var port = 3000;
app.listen(port, function () { return console.log("Server started on port " + port); });
exports = module.exports = app;
