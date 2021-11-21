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
exports.userController = void 0;
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var types_1 = require("../constants/types");
var middlewares_1 = require("../middlewares");
var errorHandlers_1 = require("../middlewares/errorHandlers");
var logTimeDecorator_1 = require("../utils/logTimeDecorator");
var userController = /** @class */ (function () {
    function userController(service) {
        this.service = service;
    }
    userController.prototype.getAutoSuggestUsers = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var loginSubstring, limit, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        loginSubstring = (_a = req.query.loginSubstring) === null || _a === void 0 ? void 0 : _a.toString();
                        limit = req.query.limit ? parseInt(req.query.limit.toString()) : 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.service.getAutoSuggest(loginSubstring, limit)];
                    case 2:
                        result = _b.sent();
                        res.json(result);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _b.sent();
                        (0, errorHandlers_1.methodErrorHandler)(req, res, error_1);
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
    userController.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.service.getUser(id)];
                    case 2:
                        user = _a.sent();
                        if (user) {
                            res.json(user);
                        }
                        else {
                            res.status(404);
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        error_2 = _a.sent();
                        (0, errorHandlers_1.methodErrorHandler)(req, res, error_2);
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
    userController.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedUser, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.updateUser(__assign(__assign({}, req.body), { id: req.params.id }))];
                    case 1:
                        updatedUser = _a.sent();
                        res.send(updatedUser);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        (0, errorHandlers_1.methodErrorHandler)(req, res, error_3);
                        if (error_3.isClientDataIncorrect) {
                            res.status(400);
                        }
                        else {
                            res.status(500);
                        }
                        res.send(error_3.toString());
                        return [3 /*break*/, 3];
                    case 3:
                        res.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    userController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.service.deleteUser(id)];
                    case 2:
                        _a.sent();
                        res.send(id);
                        return [3 /*break*/, 5];
                    case 3:
                        error_4 = _a.sent();
                        (0, errorHandlers_1.methodErrorHandler)(req, res, error_4);
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
    userController.prototype.addUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.createUser(req.body)];
                    case 1:
                        id = _a.sent();
                        res.status(201);
                        res.send(id);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        (0, errorHandlers_1.methodErrorHandler)(req, res, error_5);
                        if (error_5.isClientDataIncorrect) {
                            res.status(400);
                        }
                        else {
                            res.status(500);
                        }
                        res.send(error_5.toString());
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
        (0, inversify_express_utils_1.httpGet)('/autosuggest'),
        logTimeDecorator_1.logTime,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], userController.prototype, "getAutoSuggestUsers", null);
    __decorate([
        (0, inversify_express_utils_1.httpGet)('/:id'),
        logTimeDecorator_1.logTime,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], userController.prototype, "getUser", null);
    __decorate([
        (0, inversify_express_utils_1.httpPut)('/:id', middlewares_1.userValidator),
        logTimeDecorator_1.logTime,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], userController.prototype, "updateUser", null);
    __decorate([
        (0, inversify_express_utils_1.httpDelete)('/:id'),
        logTimeDecorator_1.logTime,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], userController.prototype, "deleteUser", null);
    __decorate([
        (0, inversify_express_utils_1.httpPost)('/', middlewares_1.userValidator),
        logTimeDecorator_1.logTime,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], userController.prototype, "addUser", null);
    userController = __decorate([
        (0, inversify_express_utils_1.controller)('/user'),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.IUserService)),
        __metadata("design:paramtypes", [Object])
    ], userController);
    return userController;
}());
exports.userController = userController;
