"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var userValidator_1 = require("../data-access/userValidator");
exports.userRouter = express_1.default.Router();
exports.userRouter.get('/autosuggest', controllers_1.getAutoSuggestUsers);
exports.userRouter.get('/:id', controllers_1.getUser);
exports.userRouter.put('/:id', userValidator_1.userValidator, controllers_1.updateUser);
exports.userRouter.delete('/:id', controllers_1.deleteUser);
exports.userRouter.post('/', userValidator_1.userValidator, controllers_1.addUser);
