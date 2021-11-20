"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupRouter = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var groupUsersValidator_1 = require("../middlewares/groupUsersValidator");
exports.groupRouter = express_1.default.Router();
var controller = new controllers_1.groupController();
exports.groupRouter.get('/:id', controller.getGroup);
exports.groupRouter.put('/:id', middlewares_1.groupValidator, controller.updateGroup);
exports.groupRouter.delete('/:id', controller.deleteGroup);
exports.groupRouter.post('/:id', groupUsersValidator_1.groupUsersValidator, controller.addUsersToGroup);
exports.groupRouter.get('/', controller.getGroups);
exports.groupRouter.post('/', middlewares_1.groupValidator, controller.addGroup);
