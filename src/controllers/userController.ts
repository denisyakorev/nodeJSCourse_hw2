import {inject} from "inversify";
import {
    controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import {IUserService} from "../services";
import { ViewHandler } from "./controllerTypes";
import {TYPES} from "../constants/types";
import {Request, Response} from "express";
import {userValidator} from "../middlewares";
import { logTime } from "../utils/logTimeDecorator";

export interface IUserController {
    getUser: ViewHandler;
    getAutoSuggestUsers: ViewHandler;
    addUser: ViewHandler;
    updateUser: ViewHandler;
    deleteUser: ViewHandler;
}

@controller('/user')
export class userController implements IUserController {

    private service: IUserService;

    constructor(@inject(TYPES.IUserService) service: IUserService) {
        this.service = service;
    }

    @httpGet('/autosuggest')
    @logTime
    async getAutoSuggestUsers(req: Request, res: Response) {
        const loginSubstring = req.query.loginSubstring?.toString();
        const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 0;
        const result = await this.service.getAutoSuggest(loginSubstring, limit);
        res.json(result);
    };

    @httpGet('/:id')
    @logTime
    async getUser(req: Request, res: Response) {
        const id = req.params.id;
        const user = await this.service.getUser(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404);
        }
    };

    @httpPut('/:id', userValidator)
    @logTime
    async updateUser(req: Request, res: Response) {
        const updatedUser = await this.service.updateUser({...req.body, id: req.params.id});
        res.send(updatedUser);
    };

    @httpDelete('/:id')
    @logTime
    async deleteUser(req: Request, res: Response) {
        const id = req.params.id;
        await this.service.deleteUser(id);
        res.send(id);
    };

    @httpPost('/', userValidator)
    @logTime
    async addUser(req: Request, res: Response) {
        const id = await this.service.createUser(req.body)
        res.status(201);
        res.send(id);
        res.end();
    };
}

