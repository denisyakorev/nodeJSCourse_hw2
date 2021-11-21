"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupController = void 0;
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var types_1 = require("../constants/types");
var middlewares_1 = require("../middlewares");
var groupUsersValidator_1 = require("../middlewares/groupUsersValidator");
var errorHandlers_1 = require("../middlewares/errorHandlers");
var logTimeDecorator_1 = require("../utils/logTimeDecorator");
var groupController = /** @class */ (function () {
    function groupController(service) {
        this.service = service;
    }
    groupController.prototype.getGroup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, group, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.service.getGroup(id)];
                    case 2:
                        group = _a.sent();
                        if (group) {
                            res.json(group);
                        }
                        else {
                            res.status(404);
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        errorHandlers_1.logger.error("getGroup: req - " + JSON.stringify(req) + "\n            Error: " + error_1);
                        res.status(500);
                        return [3 /*break*/, 5];
                    case 4:
                        res.end();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    groupController.prototype.updateGroup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedGroup, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.updateGroup(__assign(__assign({}, req.body), { id: req.params.id }))];
                    case 1:
                        updatedGroup = _a.sent();
                        res.send(updatedGroup);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        errorHandlers_1.logger.error("updateGroup: req - " + JSON.stringify(req) + "\n            Error: " + error_2);
                        if (error_2.isClientDataIncorrect) {
                            res.status(400);
                        }
                        else {
                            res.status(500);
                        }
                        res.send(error_2.toString());
                        return [3 /*break*/, 3];
                    case 3:
                        res.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    groupController.prototype.deleteGroup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.service.deleteGroup(id)];
                    case 2:
                        _a.sent();
                        res.send(id);
                        return [3 /*break*/, 5];
                    case 3:
                        error_3 = _a.sent();
                        errorHandlers_1.logger.error("deleteGroup: req - " + JSON.stringify(req) + "\n            Error: " + error_3);
                        res.status(500);
                        return [3 /*break*/, 5];
                    case 4:
                        res.end();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    groupController.prototype.addUsersToGroup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedGroup, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.addUsersToGroup(req.params.id, req.body.userIds)];
                    case 1:
                        updatedGroup = _a.sent();
                        res.send(updatedGroup);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        errorHandlers_1.logger.error("addUsersToGroup: req - " + JSON.stringify(req) + "\n            Error: " + error_4);
                        if (error_4.isClientDataIncorrect) {
                            res.status(400);
                        }
                        else {
                            res.status(500);
                        }
                        res.send(error_4.toString());
                        return [3 /*break*/, 3];
                    case 3:
                        res.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    groupController.prototype.getGroups = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.getGroups()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_5 = _a.sent();
                        errorHandlers_1.logger.error("getGroups: req - " + JSON.stringify(req) + "\n            Error: " + error_5);
                        res.status(500);
                        res.end();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    groupController.prototype.addGroup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.createGroup(req.body)];
                    case 1:
                        id = _a.sent();
                        res.status(201);
                        res.send(id);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        errorHandlers_1.logger.error("addGroup: req - " + JSON.stringify(req) + "\n            Error: " + error_6);
                        if (error_6.isClientDataIncorrect) {
                            res.status(400);
                        }
                        else {
                            res.status(500);
                        }
                        res.send(error_6.toString());
                        return [3 /*break*/, 3];
                    case 3:
                        res.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    __decorate([
        (0, inversify_express_utils_1.httpGet)('/:id'),
        logTimeDecorator_1.logTime,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], groupController.prototype, "getGroup", null);
    __decorate([
        (0, inversify_express_utils_1.httpPut)('/:id', middlewares_1.groupValidator),
        logTimeDecorator_1.logTime,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], groupController.prototype, "updateGroup", null);
    __decorate([
        (0, inversify_express_utils_1.httpDelete)('/:id'),
        logTimeDecorator_1.logTime,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], groupController.prototype, "deleteGroup", null);
    __decorate([
        (0, inversify_express_utils_1.httpPost)('/:id', groupUsersValidator_1.groupUsersValidator),
        logTimeDecorator_1.logTime,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], groupController.prototype, "addUsersToGroup", null);
    __decorate([
        (0, inversify_express_utils_1.httpGet)('/'),
        logTimeDecorator_1.logTime,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], groupController.prototype, "getGroups", null);
    __decorate([
        (0, inversify_express_utils_1.httpPost)('/', middlewares_1.groupValidator),
        logTimeDecorator_1.logTime,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], groupController.prototype, "addGroup", null);
    groupController = __decorate([
        (0, inversify_express_utils_1.controller)('/group'),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.IGroupService)),
        __metadata("design:paramtypes", [Object])
    ], groupController);
    return groupController;
}());
exports.groupController = groupController;
