"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodErrorHandler = exports.errorHandler = exports.logger = void 0;
var winston_1 = __importDefault(require("winston"));
exports.logger = winston_1.default.createLogger({
    level: 'error',
    transports: [
        new winston_1.default.transports.Console(),
    ]
});
var errorHandler = function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    exports.logger.error(err);
    res.status(500).send('Something broke!');
};
exports.errorHandler = errorHandler;
var methodErrorHandler = function (req, res, error) {
    exports.logger.error("\n    req: \n        url: " + req.url + ",\n        params: " + JSON.stringify(req.params) + ",\n        query: " + JSON.stringify(req.query) + ",\n    \n    res: \n        status: " + res.status + ",\n        headersSent: " + res.headersSent + "\n        \n    error:\n        message: " + error.message + ",\n        stack: " + error.stack + "\n    ");
};
exports.methodErrorHandler = methodErrorHandler;
