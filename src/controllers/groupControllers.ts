import {ViewHandler} from "./types";
import {GroupPSQLRepository, IGroupRepository} from "../repositories/groupRepository";
import {groupService, ServiceError} from "../services";

const service = new groupService(GroupPSQLRepository.createRepository() as IGroupRepository);

export const getGroup: ViewHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const group = await service.getGroup(id);
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

export const getGroups: ViewHandler = async (req, res) => {
    return await service.getGroups();
};

export const addGroup: ViewHandler = async (req, res) => {
    try {
        const id = await service.createGroup(req.body)
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

export const updateGroup: ViewHandler = async (req, res) => {
    try {
        const updatedGroup = await service.updateGroup({...req.body, id: req.params.id});
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

export const deleteGroup: ViewHandler = async (req, res) => {
    const id = req.params.id;
    try {
        await service.deleteGroup(id);
        res.send(id);
    } catch(err) {
        console.log(err);
        res.status(500);
    } finally {
        res.end();
    }
};

export const addUsersToGroup: ViewHandler = async (req, res) => {
    try {
        const updatedGroup = await service.addUsersToGroup(req.params.id, req.body.userIds);
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