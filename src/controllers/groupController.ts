import {inject} from "inversify";
import {Request, Response} from "express";
import {controller, httpDelete, httpGet, httpPost, httpPut} from "inversify-express-utils";

import {ViewHandler} from "./controllerTypes";
import {IGroupService, ServiceError} from "../services";
import {TYPES} from "../constants/types";
import {groupValidator} from "../middlewares";
import {groupUsersValidator} from "../middlewares/groupUsersValidator";
import {logger, methodErrorHandler} from "../middlewares/errorHandlers";
import {logTime} from "../utils/logTimeDecorator";

export interface IGroupController {
    getGroup: ViewHandler;
    getGroups: ViewHandler;
    addGroup: ViewHandler;
    updateGroup: ViewHandler;
    deleteGroup: ViewHandler;
    addUsersToGroup: ViewHandler;
}

@controller('/group')
export class groupController implements IGroupController {
    private service:IGroupService;

    constructor(@inject(TYPES.IGroupService) service: IGroupService) {
      this.service =   service;
    }

    @httpGet('/:id')
    @logTime
    async getGroup(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const group = await this.service.getGroup(id);
            if (group) {
                res.json(group);
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

    @httpPut('/:id', groupValidator)
    @logTime
    async updateGroup(req: Request, res: Response) {
        try {
            const updatedGroup = await this.service.updateGroup({...req.body, id: req.params.id});
            res.send(updatedGroup);
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
    async deleteGroup(req: Request, res: Response) {
        const id = req.params.id;
        try {
            await this.service.deleteGroup(id);
            res.send(id);
        } catch(error) {
            methodErrorHandler(req, res, error as Error);
            res.status(500);
        } finally {
            res.end();
        }
    };

    @httpPost('/:id', groupUsersValidator)
    @logTime
    async addUsersToGroup(req: Request, res: Response) {
        try {
            const updatedGroup = await this.service.addUsersToGroup(req.params.id, req.body.userIds);
            res.send(updatedGroup);
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
    }

    @httpGet('/')
    @logTime
    async getGroups(req: Request, res: Response) {
        try {
            return await this.service.getGroups();
        } catch(error) {
            methodErrorHandler(req, res, error as Error);
            res.status(500);
            res.end();
        }

    };

    @httpPost('/', groupValidator)
    @logTime
    async addGroup(req: Request, res: Response) {
        try {
            const id = await this.service.createGroup(req.body)
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

