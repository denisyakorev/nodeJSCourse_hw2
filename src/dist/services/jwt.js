"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
var inversify_binding_decorators_1 = require("inversify-binding-decorators");
var types_1 = require("../constants/types");
var config_1 = require("../config/config");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = require("crypto");
var jwtService = /** @class */ (function () {
    function jwtService() {
        var _this = this;
        this.secret = config_1.config.jwtSecret;
        this.sign = function (authUser) {
            return Promise.resolve(jsonwebtoken_1.default.sign(authUser, _this.secret));
        };
        this.getRefreshToken = function (authUser) {
            return Promise.resolve((0, crypto_1.randomUUID)());
        };
    }
    jwtService = __decorate([
        (0, inversify_binding_decorators_1.provide)(types_1.TYPES.IUserService)
    ], jwtService);
    return jwtService;
}());
exports.jwtService = jwtService;
