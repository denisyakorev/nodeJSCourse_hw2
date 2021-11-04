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
exports.deleteUser = exports.updateUser = exports.addUser = exports.getAutoSuggestUsers = exports.getUser = exports.homepage = void 0;
var repository_1 = require("../repository");
var validators_1 = require("./validators");
var repository = repository_1.Repository.createRepository();
var homepage = function (req, res) {
    console.log(req.headers.cookie);
    console.log('path', req.path);
    res.send("Please, use /user route");
};
exports.homepage = homepage;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, repository.getUser(id)];
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
                e_1 = _a.sent();
                res.status(500);
                return [3 /*break*/, 5];
            case 4:
                res.end();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var getAutoSuggestUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loginSubstring, limit, users, e_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                loginSubstring = (_a = req.query.loginSubstring) === null || _a === void 0 ? void 0 : _a.toString();
                limit = req.query.limit ? parseInt(req.query.limit.toString()) : 0;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, 6, 7]);
                if (!(loginSubstring && limit)) return [3 /*break*/, 3];
                return [4 /*yield*/, repository.getAutoSuggestUsers(loginSubstring, limit)];
            case 2:
                users = _b.sent();
                res.json(users);
                return [3 /*break*/, 4];
            case 3:
                res.status(400);
                _b.label = 4;
            case 4: return [3 /*break*/, 7];
            case 5:
                e_2 = _b.sent();
                res.status(500);
                return [3 /*break*/, 7];
            case 6:
                res.end();
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getAutoSuggestUsers = getAutoSuggestUsers;
var addUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_1, id, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, validators_1.checkUserData)(req)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, (0, validators_1.loginValidation)(user.login, repository)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400);
                res.send(err_1.toString());
                return [2 /*return*/, res.end()];
            case 4:
                _a.trys.push([4, 6, 7, 8]);
                return [4 /*yield*/, repository.createUser(user)];
            case 5:
                id = _a.sent();
                res.status(201);
                res.send(id);
                return [3 /*break*/, 8];
            case 6:
                e_3 = _a.sent();
                console.log(e_3);
                res.status(500);
                return [3 /*break*/, 8];
            case 7:
                res.end();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.addUser = addUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, err_2, updatedUser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, validators_1.checkUserData)(req)];
            case 2:
                user = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                res.send(err_2.toString());
                return [2 /*return*/, res.end()];
            case 4:
                _a.trys.push([4, 6, 7, 8]);
                return [4 /*yield*/, repository.updateUser(__assign(__assign({}, user), { id: id }))];
            case 5:
                updatedUser = _a.sent();
                res.send(updatedUser);
                return [3 /*break*/, 8];
            case 6:
                err_3 = _a.sent();
                console.log(err_3);
                res.status(500);
                return [3 /*break*/, 8];
            case 7:
                res.end();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, repository.deleteUser(id)];
            case 2:
                _a.sent();
                res.send(id);
                return [3 /*break*/, 5];
            case 3:
                err_4 = _a.sent();
                console.log(err_4);
                res.status(500);
                return [3 /*break*/, 5];
            case 4:
                res.end();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
