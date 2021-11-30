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
var group_1 = require("../group");
var getGroupMock = jest.fn();
var updateGroupMock = jest.fn();
var deleteGroupMock = jest.fn();
var addUsersToGroupMock = jest.fn();
var getGroupsMock = jest.fn();
var createGroupMock = jest.fn();
var serviceMock = /** @class */ (function () {
    function serviceMock() {
        this.getGroup = getGroupMock;
        this.updateGroup = updateGroupMock;
        this.deleteGroup = deleteGroupMock;
        this.addUsersToGroup = addUsersToGroupMock;
        this.getGroups = getGroupsMock;
        this.createGroup = createGroupMock;
    }
    return serviceMock;
}());
var controller = new group_1.groupController(new serviceMock());
var jsonMock = jest.fn();
var statusMock = jest.fn();
var endMock = jest.fn();
var sendMock = jest.fn();
var res = {
    json: jsonMock,
    status: statusMock,
    end: endMock,
    send: sendMock,
};
describe('getGroup', function () {
    beforeEach(function () { return jest.clearAllMocks(); });
    it('Должна записывать в ответ значение, которое вернул сервис, если оно корректное', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        params: {
                            id: '1'
                        }
                    };
                    getGroupMock.mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve({})];
                    }); }); });
                    return [4 /*yield*/, controller.getGroup(req, res)];
                case 1:
                    _a.sent();
                    expect(getGroupMock).toHaveBeenCalledWith('1');
                    expect(jsonMock).toHaveBeenCalledWith({});
                    return [2 /*return*/];
            }
        });
    }); });
    it('Должна устанавливать статус 404, если значение некорректное', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        params: {
                            id: '1'
                        }
                    };
                    getGroupMock.mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve(undefined)];
                    }); }); });
                    return [4 /*yield*/, controller.getGroup(req, res)];
                case 1:
                    _a.sent();
                    expect(getGroupMock).toHaveBeenCalledWith('1');
                    expect(statusMock).toHaveBeenCalledWith(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('updateGroup', function () {
    beforeEach(function () { return jest.clearAllMocks(); });
    it('Должна записывать в ответ значение, которое вернул сервис', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        params: {
                            id: '1',
                        },
                        body: {
                            "login": "log",
                        }
                    };
                    updateGroupMock.mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve({})];
                    }); }); });
                    return [4 /*yield*/, controller.updateGroup(req, res)];
                case 1:
                    _a.sent();
                    expect(updateGroupMock).toHaveBeenCalledWith({
                        id: '1',
                        login: 'log',
                    });
                    expect(sendMock).toHaveBeenCalledWith({});
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('deleteGroup', function () {
    beforeEach(function () { return jest.clearAllMocks(); });
    it('Должна записывать в ответ значение, которое вернул сервис', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        params: {
                            id: '1',
                        }
                    };
                    updateGroupMock.mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve({})];
                    }); }); });
                    return [4 /*yield*/, controller.updateGroup(req, res)];
                case 1:
                    _a.sent();
                    expect(updateGroupMock).toHaveBeenCalledWith({
                        id: '1',
                        login: 'log',
                    });
                    expect(sendMock).toHaveBeenCalledWith({});
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('addUsersToGroup', function () {
    beforeEach(function () { return jest.clearAllMocks(); });
    it('Должна записывать в ответ значение, которое вернул сервис', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        params: {
                            id: '1',
                        },
                        body: {
                            userIds: ['2', '3'],
                        }
                    };
                    addUsersToGroupMock.mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve({})];
                    }); }); });
                    return [4 /*yield*/, controller.addUsersToGroup(req, res)];
                case 1:
                    _a.sent();
                    expect(addUsersToGroupMock).toHaveBeenCalledWith('1', ['2', '3']);
                    expect(sendMock).toHaveBeenCalledWith({});
                    expect(endMock).toHaveBeenCalledTimes(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('getGroups', function () {
    beforeEach(function () { return jest.clearAllMocks(); });
    it('Должна записывать в ответ значение, которое вернул сервис', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {};
                    getGroupsMock.mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve([])];
                    }); }); });
                    return [4 /*yield*/, controller.getGroups(req, res)];
                case 1:
                    _a.sent();
                    expect(getGroupsMock).toHaveBeenCalled();
                    expect(sendMock).toHaveBeenCalledWith([]);
                    expect(endMock).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('addGroup', function () {
    beforeEach(function () { return jest.clearAllMocks(); });
    it('Должна записывать в ответ значение, которое вернул сервис и устанавливать статус 201', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        body: {
                            login: "log",
                        }
                    };
                    createGroupMock.mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve('id')];
                    }); }); });
                    return [4 /*yield*/, controller.addGroup(req, res)];
                case 1:
                    _a.sent();
                    expect(createGroupMock).toHaveBeenCalledWith({ login: "log" });
                    expect(statusMock).toHaveBeenCalledWith(201);
                    expect(sendMock).toHaveBeenCalledWith('id');
                    expect(endMock).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
});
