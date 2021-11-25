"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logTime = void 0;
var logTime = function (target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.time(propertyKey);
        var returnValue = originalMethod.apply(this, args);
        console.timeEnd(propertyKey);
        return returnValue;
    };
};
exports.logTime = logTime;
