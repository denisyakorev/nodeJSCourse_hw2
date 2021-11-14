"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupRouter = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var data_access_1 = require("../data-access");
var groupUsersValidator_1 = require("../data-access/groupUsersValidator");
exports.groupRouter = express_1.default.Router();
exports.groupRouter.get('/:id', controllers_1.getGroup);
exports.groupRouter.put('/:id', data_access_1.groupValidator, controllers_1.updateGroup);
exports.groupRouter.delete('/:id', controllers_1.deleteGroup);
exports.groupRouter.post('/:id', groupUsersValidator_1.groupUsersValidator, controllers_1.addUsersToGroup);
exports.groupRouter.get('/', controllers_1.getGroups);
exports.groupRouter.post('/', data_access_1.groupValidator, controllers_1.addGroup);
