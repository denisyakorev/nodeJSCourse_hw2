"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodLogger = void 0;
var url = require('url');
var methodLogger = function (req, res, next) {
    console.log('\x1b[32m', req.method + ":", '\x1b[0m');
    console.log('\x1b[34m', "params: " + JSON.stringify(url.parse(req.url, true)), '\x1b[0m');
    console.log('\x1b[36m', "body: " + JSON.stringify(req.body), '\x1b[0m');
    next();
};
exports.methodLogger = methodLogger;
