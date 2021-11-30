"use strict";
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
require("reflect-metadata");
var user_1 = require("../user");
var getAutoSuggestMock = jest.fn().mockImplementation(function (loginSubstring, limit) {
    return Promise.resolve([]);
});
var getUserMock = jest.fn();
var updateUserMock = jest.fn();
var deleteMock = jest.fn();
var createMock = jest.fn();
var serviceMock = /** @class */ (function () {
    function serviceMock() {
        this.getAutoSuggest = getAutoSuggestMock;
        this.getUser = getUserMock;
        this.updateUser = updateUserMock;
        this.deleteUser = deleteMock;
        this.createUser = createMock;
    }
    return serviceMock;
}());
var controller = new user_1.userController(new serviceMock());
var jsonMock = jest.fn();
var statusMock = jest.fn();
var sendMock = jest.fn();
var endMock = jest.fn();
var res = {
    json: jsonMock,
    status: statusMock,
    send: sendMock,
    end: endMock,
};
describe('getAutoSuggestUsers', function () {
    beforeEach(function () { return jest.clearAllMocks(); });
    it('Должен записать в ответ результат, возвращенный сервисом', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        query: {
                            loginSubstring: 'log',
                            limit: 1
                        }
                    };
                    return [4 /*yield*/, controller.getAutoSuggestUsers(req, res)];
                case 1:
                    _a.sent();
                    expect(getAutoSuggestMock).toHaveBeenLastCalledWith('log', 1);
                    expect(jsonMock).toHaveBeenLastCalledWith([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Должен присвоить лимиту значение 0, если оно отсутствует', function () { return __awaiter(void 0, void 0, void 0, function () {
        var reqWithIncorrectLimit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reqWithIncorrectLimit = {
                        query: {
                            loginSubstring: 'log',
                        }
                    };
                    return [4 /*yield*/, controller.getAutoSuggestUsers(reqWithIncorrectLimit, res)];
                case 1:
                    _a.sent();
                    expect(getAutoSuggestMock).toHaveBeenLastCalledWith('log', 0);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('getUser', function () {
    beforeEach(function () { return jest.clearAllMocks(); });
    var req = {
        params: {
            id: '1'
        }
    };
    it('Должен записать в ответ результат, возвращенный сервисом, если результат корректен', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getUserMock.mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve({})];
                    }); }); });
                    return [4 /*yield*/, controller.getUser(req, res)];
                case 1:
                    _a.sent();
                    expect(getUserMock).toHaveBeenCalledWith('1');
                    expect(jsonMock).toHaveBeenCalledWith({});
                    return [2 /*return*/];
            }
        });
    }); });
    it('Должен установить статус 404, если пользователь не найден', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getUserMock.mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve(undefined)];
                    }); }); });
                    return [4 /*yield*/, controller.getUser(req, res)];
                case 1:
                    _a.sent();
                    expect(getUserMock).toHaveBeenCalledWith('1');
                    expect(statusMock).toHaveBeenCalledWith(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('updateUser', function () {
    var req = {
        params: {
            id: '1',
        },
        body: {
            "login": "log",
        }
    };
    it('Должен записать в ответ результат, возвращенный сервисом', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateUserMock.mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve({})];
                    }); }); });
                    return [4 /*yield*/, controller.updateUser(req, res)];
                case 1:
                    _a.sent();
                    expect(updateUserMock).toHaveBeenCalledWith({
                        "login": "log",
                        "id": '1'
                    });
                    expect(sendMock).toHaveBeenCalledWith({});
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('deleteUser', function () {
    var req = {
        params: {
            id: '1',
        }
    };
    it('Должен записывать в результат идентификатор пользователя', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    deleteMock.mockImplementation(function () { return Promise.resolve('id'); });
                    return [4 /*yield*/, controller.deleteUser(req, res)];
                case 1:
                    _a.sent();
                    expect(deleteMock).toHaveBeenCalledWith('1');
                    expect(sendMock).toHaveBeenCalledWith('1');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('addUser', function () {
    var req = {
        body: {
            id: '1',
        }
    };
    it('Должен записывать в результат идентификатор пользователя и устанавливать статус 201', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createMock.mockImplementation(function () { return Promise.resolve('id'); });
                    return [4 /*yield*/, controller.addUser(req, res)];
                case 1:
                    _a.sent();
                    expect(createMock).toHaveBeenCalledWith(req.body);
                    expect(sendMock).toHaveBeenCalledWith('id');
                    expect(statusMock).toHaveBeenCalledWith(201);
                    expect(endMock).toHaveBeenCalledTimes(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
