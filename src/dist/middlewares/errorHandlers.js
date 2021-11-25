"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodErrorHandler = exports.errorHandlers = exports.logger = void 0;
var winston_1 = __importStar(require("winston"));
exports.logger = winston_1.default.createLogger({
    level: 'error',
    transports: [
        new winston_1.default.transports.Console(),
    ],
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.prettyPrint()),
});
var errorHandlers = function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    exports.logger.error(err);
    if (err.isClientDataIncorrect) {
        res.status(400).send(err.message);
    }
    else {
        res.status(500).send('Something broke!');
    }
    res.end();
};
exports.errorHandlers = errorHandlers;
var methodErrorHandler = function (req, res, error) {
    exports.logger.error("\n    req: \n        url: " + req.url + ",\n        params: " + JSON.stringify(req.params) + ",\n        query: " + JSON.stringify(req.query) + ",\n    \n    res: \n        headersSent: " + res.headersSent + "\n        \n    error:\n        message: " + error.message + ",\n        stack: " + error.stack + "\n    ");
};
exports.methodErrorHandler = methodErrorHandler;
