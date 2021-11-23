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
exports.groupRepository = exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
var entityModels_1 = require("../entityModels");
var inversify_binding_decorators_1 = require("inversify-binding-decorators");
var types_1 = require("../../constants/types");
exports.sequelize = new sequelize_1.Sequelize(process.env.PSQLConnectionString);
var groupRepository = /** @class */ (function () {
    function groupRepository() {
        var _this = this;
        this.getGroup = function (groupId) { return __awaiter(_this, void 0, void 0, function () {
            var group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GroupModel.findByPk(groupId)];
                    case 1:
                        group = _a.sent();
                        return [2 /*return*/, group ? group : undefined];
                }
            });
        }); };
        this.getGroups = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GroupModel.findAll({
                            order: [
                                ['name', 'ASC']
                            ]
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.isNameExists = function (groupName) { return __awaiter(_this, void 0, void 0, function () {
            var group;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, GroupModel.findOne({
                            where: {
                                name: (_a = {},
                                    _a[sequelize_1.Op.in] = [groupName],
                                    _a),
                            },
                        })];
                    case 1:
                        group = _b.sent();
                        return [2 /*return*/, !!group];
                }
            });
        }); };
        this.createGroup = function (group) { return __awaiter(_this, void 0, void 0, function () {
            var createdGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GroupModel.create(group)];
                    case 1:
                        createdGroup = _a.sent();
                        return [2 /*return*/, createdGroup.id];
                }
            });
        }); };
        this.updateGroup = function (group) { return __awaiter(_this, void 0, void 0, function () {
            var updatedGroup;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, GroupModel.update({
                            name: group.name,
                            permissions: group.permissions,
                        }, {
                            where: {
                                id: (_a = {},
                                    _a[sequelize_1.Op.in] = [group.id],
                                    _a),
                            },
                        })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getGroup(group.id)];
                    case 2:
                        updatedGroup = _b.sent();
                        return [2 /*return*/, updatedGroup ? updatedGroup : group];
                }
            });
        }); };
        this.deleteGroup = function (groupId) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, GroupModel.destroy({
                                where: {
                                    id: (_a = {},
                                        _a[sequelize_1.Op.in] = [groupId],
                                        _a)
                                }
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_1 = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.addUsersToGroup = function (groupId, userIds) { return __awaiter(_this, void 0, void 0, function () {
            var error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, exports.sequelize.transaction(function (t) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    userIds.forEach(function (userId) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, entityModels_1.GroupUser.create({
                                                        GroupId: groupId,
                                                        UserId: userId
                                                    })];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.storage = exports.sequelize;
        this.storage.authenticate()
            .then(function () { return console.log('Connection has been established successfully.'); })
            .catch(function (error) { return console.error('Unable to connect to the database:', error); });
    }
    groupRepository_1 = groupRepository;
    var groupRepository_1;
    groupRepository.createRepository = function () {
        if (!groupRepository_1.repository) {
            groupRepository_1.repository = new groupRepository_1();
        }
        return groupRepository_1.repository;
    };
    groupRepository = groupRepository_1 = __decorate([
        (0, inversify_binding_decorators_1.provide)(types_1.TYPES.IGroupRepository),
        __metadata("design:paramtypes", [])
    ], groupRepository);
    return groupRepository;
}());
exports.groupRepository = groupRepository;
;
