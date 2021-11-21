import {inject} from "inversify";
import {
    controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import {ServiceError, IUserService} from "../services";
import { ViewHandler } from "./controllerTypes";
import {TYPES} from "../constants/types";
import {Request, Response} from "express";
import {userValidator} from "../middlewares";
import {logger, methodErrorHandler} from "../middlewares/errorHandlers";
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
        try {
            const result = await this.service.getAutoSuggest(loginSubstring, limit);
            res.json(result);
        } catch (error) {
            methodErrorHandler(req, res, error as Error);
            res.status(500);
        } finally {
            res.end();
        }
    };

    @httpGet('/:id')
    @logTime
    async getUser(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const user = await this.service.getUser(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404);
            }
        } catch (error) {
            methodErrorHandler(req, res, error as Error);
            res.status(500);
        } finally {
            res.end();
        }
    };

    @httpPut('/:id', userValidator)
    @logTime
    async updateUser(req: Request, res: Response) {
        try {
            const updatedUser = await this.service.updateUser({...req.body, id: req.params.id});
            res.send(updatedUser);
        } catch(error) {
            methodErrorHandler(req, res, error as Error);
            if ((error as ServiceError).isClientDataIncorrect) {
                res.status(400);
            } else {
                res.status(500);
            }
            res.send((error as Error).toString());
        }
        res.end();
    };

    @httpDelete('/:id')
    @logTime
    async deleteUser(req: Request, res: Response) {
        const id = req.params.id;
        try {
            await this.service.deleteUser(id);
            res.send(id);
        } catch(error) {
            methodErrorHandler(req, res, error as Error);
            res.status(500);
        } finally {
            res.end();
        }
    };

    @httpPost('/', userValidator)
    @logTime
    async addUser(req: Request, res: Response) {
        try {
            const id = await this.service.createUser(req.body)
            res.status(201);
            res.send(id);
        }catch(error) {
            methodErrorHandler(req, res, error as Error);
            if ((error as ServiceError).isClientDataIncorrect) {
                res.status(400);
            } else {
                res.status(500);
            }
            res.send((error as Error).toString());
        }
        res.end();
    };
}

