import express from "express";
import {addGroup, deleteGroup, getGroup, getGroups, updateGroup} from "../controllers";
import { groupValidator } from "../data-access";

export const groupRouter = express.Router();

groupRouter.get('/:id', getGroup);

groupRouter.put('/:id', groupValidator, updateGroup);

groupRouter.delete('/:id', deleteGroup);

groupRouter.get('/', getGroups);

groupRouter.post('/', groupValidator, addGroup);

