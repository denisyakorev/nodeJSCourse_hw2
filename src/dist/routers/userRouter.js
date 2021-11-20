"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var userValidator_1 = require("../middlewares/userValidator");
exports.userRouter = express_1.default.Router();
var controller = ;
;
exports.userRouter.get('/autosuggest', controller.getAutoSuggestUsers);
exports.userRouter.get('/:id', controller.getUser);
exports.userRouter.put('/:id', userValidator_1.userValidator, controller.updateUser);
exports.userRouter.delete('/:id', controller.deleteUser);
exports.userRouter.post('/', userValidator_1.userValidator, controller.addUser);
