import express from "express";
import {addGroup, addUsersToGroup, deleteGroup, getGroup, getGroups, updateGroup} from "../controllers";
import { groupValidator } from "../data-access";
import {groupUsersValidator} from "../data-access/groupUsersValidator";

export const groupRouter = express.Router();

groupRouter.get('/:id', getGroup);

groupRouter.put('/:id', groupValidator, updateGroup);

groupRouter.delete('/:id', deleteGroup);

groupRouter.post('/:id', groupUsersValidator, addUsersToGroup);

groupRouter.get('/', getGroups);

groupRouter.post('/', groupValidator, addGroup);

