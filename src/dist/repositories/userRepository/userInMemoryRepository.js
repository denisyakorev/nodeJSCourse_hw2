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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInMemoryRepository = void 0;
var uuid_1 = require("uuid");
var UserInMemoryRepository = /** @class */ (function () {
    function UserInMemoryRepository() {
        var _this = this;
        this.users = [];
        this.createUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var id, message;
            return __generator(this, function (_a) {
                try {
                    id = (0, uuid_1.v4)();
                    this.users.push(__assign(__assign({}, user), { id: id, isDeleted: false }));
                    return [2 /*return*/, id];
                }
                catch (e) {
                    message = 'Error during creating user: ' + e;
                    console.log(message);
                    throw new Error(message);
                }
                return [2 /*return*/];
            });
        }); };
        this.deleteUser = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var existingUser, e_1, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getUser(id)];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser) {
                            existingUser.isDeleted = true;
                        }
                        ;
                        return [2 /*return*/, true];
                    case 2:
                        e_1 = _a.sent();
                        message = 'Error during deleting user: ' + e_1;
                        console.log(message);
                        throw new Error(message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUsersSortedByLogin = function () {
            return __spreadArray([], _this.users, true).sort(function (firstUser, secondUser) {
                if (firstUser.login > secondUser.login)
                    return 1;
                if (firstUser.login < secondUser.login)
                    return -1;
                return 0;
            });
        };
        this.getAutoSuggestUsers = function (loginSubstring, limit) { return __awaiter(_this, void 0, void 0, function () {
            var result, sortedUsers, _i, sortedUsers_1, user, message;
            return __generator(this, function (_a) {
                try {
                    result = [];
                    sortedUsers = this.getUsersSortedByLogin();
                    for (_i = 0, sortedUsers_1 = sortedUsers; _i < sortedUsers_1.length; _i++) {
                        user = sortedUsers_1[_i];
                        if (result.length === limit)
                            break;
                        if (user.login.includes(loginSubstring)) {
                            result.push(user);
                        }
                    }
                    ;
                    return [2 /*return*/, result.sort()];
                }
                catch (e) {
                    message = 'Error during finding auto suggests: ' + e;
                    console.log(message);
                    throw new Error(message);
                }
                return [2 /*return*/];
            });
        }); };
        this.getUser = function (id) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.users.find(function (user) { return user.id === id; })];
            });
        }); };
        this.isLoginExists = function (login) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = this.users.find(function (user) { return user.login === login; });
                return [2 /*return*/, user !== undefined];
            });
        }); };
        this.updateUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var userIdx, message;
            return __generator(this, function (_a) {
                try {
                    userIdx = this.users.findIndex(function (userFromList) { return userFromList.id === user.id; });
                    if (userIdx === -1)
                        return [2 /*return*/, user];
                    this.users = __spreadArray(__spreadArray(__spreadArray([], this.users.slice(0, userIdx), true), [
                        __assign(__assign({}, user), { id: this.users[userIdx].id, isDeleted: this.users[userIdx].isDeleted })
                    ], false), this.users.slice(userIdx + 1), true);
                    return [2 /*return*/, this.users[userIdx]];
                }
                catch (e) {
                    message = 'Error during updating user: ' + e;
                    console.log(message);
                    throw new Error(message);
                }
                return [2 /*return*/];
            });
        }); };
    }
    UserInMemoryRepository.createRepository = function () {
        if (!UserInMemoryRepository.repository) {
            UserInMemoryRepository.repository = new UserInMemoryRepository();
        }
        return UserInMemoryRepository.repository;
    };
    return UserInMemoryRepository;
}());
exports.UserInMemoryRepository = UserInMemoryRepository;
