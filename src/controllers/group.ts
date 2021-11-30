import {inject} from "inversify";
import {Request, Response} from "express";
import {controller, httpDelete, httpGet, httpPost, httpPut} from "inversify-express-utils";

import {ViewHandler} from "./controllerTypes";
import {IGroupService} from "../services";
import {TYPES} from "../constants/types";
import {groupValidator} from "../middlewares";
import {groupUsersValidator} from "../middlewares/groupUsersValidator";
import {logTime} from "../utils/logTimeDecorator";
import {checkAuth} from "../middlewares/checkAuth";

export interface IGroupController {
    getGroup: ViewHandler;
    getGroups: ViewHandler;
    addGroup: ViewHandler;
    updateGroup: ViewHandler;
    deleteGroup: ViewHandler;
    addUsersToGroup: ViewHandler;
}

@controller('/group', checkAuth)
export class groupController implements IGroupController {
    private service:IGroupService;

    constructor(@inject(TYPES.IGroupService) service: IGroupService) {
      this.service =   service;
    }

    @httpGet('/:id')
    @logTime
    async getGroup(req: Request, res: Response) {
        const id = req.params.id;
        const group = await this.service.getGroup(id);
        if (group) {
            res.json(group);
        } else {
            res.status(404);
        }
    };

    @httpPut('/:id', groupValidator)
    @logTime
    async updateGroup(req: Request, res: Response) {
        const updatedGroup = await this.service.updateGroup({...req.body, id: req.params.id});
        res.send(updatedGroup);
        res.end();
    };

    @httpDelete('/:id')
    @logTime
    async deleteGroup(req: Request, res: Response) {
        const id = req.params.id;
        await this.service.deleteGroup(id);
        res.send(id);
    };

    @httpPost('/:id', groupUsersValidator)
    @logTime
    async addUsersToGroup(req: Request, res: Response) {
        const updatedGroup = await this.service.addUsersToGroup(req.params.id, req.body.userIds);
        res.send(updatedGroup);
        res.end();
    }

    @httpGet('/')
    @logTime
    async getGroups(req: Request, res: Response) {
        const groups = await this.service.getGroups();
        res.send(groups);
        res.end();
    };

    @httpPost('/', groupValidator)
    @logTime
    async addGroup(req: Request, res: Response) {
        const id = await this.service.createGroup(req.body)
        res.status(201);
        res.send(id);
        res.end();
    };
}

