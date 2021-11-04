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
Object.defineProperty(exports, "__esModule", { value: true });
var userRepository_1 = require("./userRepository");
describe('Repository', function () {
    var repository;
    var user1 = {
        id: '1',
        login: 'login',
        password: 'password',
        isDeleted: false,
        age: 20,
    };
    var user2 = {
        id: '2',
        login: 'login2',
        password: 'password2',
        isDeleted: false,
        age: 21,
    };
    var user3 = {
        id: '3',
        login: 'login3',
        password: 'password3',
        isDeleted: true,
        age: 28,
    };
    beforeEach(function () {
        repository = new userRepository_1.UserRepository();
    });
    it('should return true if user with login already exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository.users = [user1, user2];
                    return [4 /*yield*/, repository.isLoginExists(user1.login)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return false if user with login does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository.users = [user1, user2];
                    return [4 /*yield*/, repository.isLoginExists(user3.login)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should add user to repository', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        login: 'login',
                        password: 'password',
                        age: 20,
                    };
                    repository.users = [];
                    return [4 /*yield*/, repository.createUser(user)];
                case 1:
                    id = _a.sent();
                    expect(id).toBeTruthy();
                    expect(repository.users).toEqual([__assign(__assign({}, repository.users[0]), user)]);
                    expect(repository.users[0].id).toBeTruthy();
                    expect(repository.users[0].isDeleted).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete users from array', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result1, result2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository.users = [user1, user2, user3];
                    return [4 /*yield*/, repository.deleteUser(user2.id)];
                case 1:
                    result1 = _a.sent();
                    return [4 /*yield*/, repository.deleteUser(user3.id)];
                case 2:
                    result2 = _a.sent();
                    expect(result1).toBe(true);
                    expect(result2).toBe(true);
                    expect(repository.users).toEqual([
                        user1,
                        __assign(__assign({}, user2), { isDeleted: true }),
                        user3
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return true if element is not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository.users = [user1, user2];
                    return [4 /*yield*/, repository.deleteUser(user3.id)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return user if it exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository.users = [user1, user2];
                    return [4 /*yield*/, repository.getUser('2')];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(user2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return undefined if it exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository.users = [user1, user2];
                    return [4 /*yield*/, repository.getUser('8')];
                case 1:
                    result = _a.sent();
                    expect(result).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update user if it exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newUser2, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository.users = [user1, user2];
                    newUser2 = {
                        id: user2.id,
                        login: "login89",
                        password: "password89",
                        age: 89
                    };
                    return [4 /*yield*/, repository.updateUser(newUser2)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(__assign(__assign({}, user2), newUser2));
                    expect(repository.users).toEqual([user1, __assign(__assign({}, user2), newUser2)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return user and not update list if user does not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository.users = [user1, user2];
                    return [4 /*yield*/, repository.updateUser(user3)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(user3);
                    expect(repository.users).toEqual([user1, user2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return empty list of autosuggested users if limit equals 0', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository.users = [user1, user2, user3];
                    return [4 /*yield*/, repository.getAutoSuggestUsers('log', 0)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return empty list of autosuggested users if there are not similar logins', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository.users = [user3, user2, user1];
                    return [4 /*yield*/, repository.getAutoSuggestUsers('abc', 3)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return list of autosuggested users with right length if there are similar logins', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository.users = [user1, user2, user3];
                    return [4 /*yield*/, repository.getAutoSuggestUsers('log', 2)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual([user1, user2]);
                    return [2 /*return*/];
            }
        });
    }); });
});
