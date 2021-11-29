"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_express_utils_1 = __importDefault(require("inversify-express-utils"));
inversify_express_utils_1.default.controller = jest.fn();
var user_1 = require("../user");
describe('getAutoSuggestUsers', function () {
    it('should return result from service', function () {
        var getAutoSuggestMock = jest.fn().mockImplementation(function (loginSubstring, limit) {
            return [];
        });
        var serviceMock = /** @class */ (function () {
            function serviceMock() {
                this.getAutoSuggest = getAutoSuggestMock;
            }
            return serviceMock;
        }());
        var controller = new user_1.userController(new serviceMock());
        var req = {
            query: {
                loginSubstring: 'log',
                limit: 1
            }
        };
        var callback = jest.fn();
        var res = {
            json: callback,
        };
        var result = controller.getAutoSuggestUsers(req, res);
        expect(getAutoSuggestMock).toHaveBeenLastCalledWith('log', 1);
        expect(result).toEqual([]);
    });
});
