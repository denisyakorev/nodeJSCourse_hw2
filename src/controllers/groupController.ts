import {injectable, inject} from "inversify";
import {ViewHandler} from "./controllerTypes";
import {IGroupService, ServiceError} from "../services";
import {TYPES} from "../constants/types";
import {controller, httpDelete, httpGet, httpPost, httpPut} from "inversify-express-utils";
import {Request, Response} from "express";
import {groupValidator} from "../middlewares";
import {groupUsersValidator} from "../middlewares/groupUsersValidator";

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
    async getGroup(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const group = await this.service.getGroup(id);
            if (group) {
                res.json(group);
            } else {
                res.status(404);
            }
        } catch (e) {
            res.status(500);
        } finally {
            res.end();
        }
    };

    @httpPut('/:id', groupValidator)
    async updateGroup(req: Request, res: Response) {
        try {
            const updatedGroup = await this.service.updateGroup({...req.body, id: req.params.id});
            res.send(updatedGroup);
        } catch(error) {
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
    async deleteGroup(req: Request, res: Response) {
        const id = req.params.id;
        try {
            await this.service.deleteGroup(id);
            res.send(id);
        } catch(err) {
            console.log(err);
            res.status(500);
        } finally {
            res.end();
        }
    };

    @httpPost('/:id', groupUsersValidator)
    async addUsersToGroup(req: Request, res: Response) {
        try {
            const updatedGroup = await this.service.addUsersToGroup(req.params.id, req.body.userIds);
            res.send(updatedGroup);
        } catch(error) {
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
    async getGroups(req: Request, res: Response) {
        return await this.service.getGroups();
    };

    @httpPost('/', groupValidator)
    async addGroup(req: Request, res: Response) {
        try {
            const id = await this.service.createGroup(req.body)
            res.status(201);
            res.send(id);
        }catch(error) {
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

