"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.UserDAO = void 0;
var sequelize_1 = require("sequelize");
var types_1 = require("../../constants/types");
var inversify_binding_decorators_1 = require("inversify-binding-decorators");
var user_1 = require("../../models/user");
var connect_1 = require("../../config/connect");
var UserDAO = /** @class */ (function () {
    function UserDAO() {
        var _this = this;
        this.createUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.UserModel.create(user)];
                    case 1:
                        createdUser = _a.sent();
                        return [2 /*return*/, createdUser.id];
                }
            });
        }); };
        this.deleteUser = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.UserModel.update({ isDeleted: true }, {
                            where: {
                                id: userId,
                            },
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        }); };
        this.getAutoSuggestUsers = function (loginSubstring, limit) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, user_1.UserModel.findAll({
                            where: {
                                login: (_a = {},
                                    _a[sequelize_1.Op.substring] = loginSubstring,
                                    _a),
                                isDeleted: (_b = {},
                                    _b[sequelize_1.Op.not] = true,
                                    _b)
                            },
                            order: [
                                ['login', 'ASC']
                            ],
                            limit: limit
                        })];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        }); };
        this.getUser = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.UserModel.findByPk(id)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user ? user : undefined];
                }
            });
        }); };
        this.getUserByCredentials = function (login, password) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, user_1.UserModel.findOne({
                            where: {
                                login: (_a = {},
                                    _a[sequelize_1.Op.in] = [login],
                                    _a),
                                password: (_b = {},
                                    _b[sequelize_1.Op.in] = [password],
                                    _b)
                            },
                        })];
                    case 1:
                        user = _c.sent();
                        return [2 /*return*/, user || undefined];
                }
            });
        }); };
        this.isLoginExists = function (login) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user_1.UserModel.findOne({
                            where: {
                                login: (_a = {},
                                    _a[sequelize_1.Op.in] = [login],
                                    _a),
                            },
                        })];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, !!user];
                }
            });
        }); };
        this.updateUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var updatedUser;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user_1.UserModel.update({
                            login: user.login,
                            password: user.password,
                            age: user.age
                        }, {
                            where: {
                                id: (_a = {},
                                    _a[sequelize_1.Op.in] = [user.id],
                                    _a),
                            },
                        })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getUser(user.id)];
                    case 2:
                        updatedUser = _b.sent();
                        return [2 /*return*/, updatedUser ? updatedUser : user];
                }
            });
        }); };
        this.storage = connect_1.sequelize;
        this.storage.authenticate()
            .then(function () { return console.log('Connection has been established successfully.'); })
            .catch(function (error) { return console.error('Unable to connect to the database:', error); });
    }
    UserDAO_1 = UserDAO;
    var UserDAO_1;
    UserDAO.createRepository = function () {
        if (!UserDAO_1.repository) {
            UserDAO_1.repository = new UserDAO_1();
        }
        return UserDAO_1.repository;
    };
    UserDAO = UserDAO_1 = __decorate([
        (0, inversify_binding_decorators_1.provide)(types_1.TYPES.IUserRepository),
        __metadata("design:paramtypes", [])
    ], UserDAO);
    return UserDAO;
}());
exports.UserDAO = UserDAO;
