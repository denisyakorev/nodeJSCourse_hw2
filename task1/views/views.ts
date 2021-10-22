import {Request, Response} from "express";
import {Repository} from "../repository";
import { User } from "../types";
import {userScheme} from "./validator";

const repository = Repository.createRepository();

export type ViewHandler = (req: Request, res: Response) => void;

export const homepage: ViewHandler = (req, res) => {
    res.send("Please, use /user route");
};

export const getUser: ViewHandler = async (req, res) => {
  const id = req.params.id;
  const user = await repository.getUser(id);
  if (user) {
      res.json(user);
  } else {
      res.sendStatus(404);
  }
  res.end();
};

export const getAutoSuggestUsers: ViewHandler = async (req, res) => {
    const loginSubstring = req.query.loginSubstring?.toString();
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 0;

    if (loginSubstring && limit) {
        const users = await repository.getAutoSuggestUsers(loginSubstring, limit);
        res.json(users);
    } else {
        res.sendStatus(400);
    }
    res.end();
};

const checkUserData = async (req: Request): Promise<Omit<User, "id" | "isDeleted">> => {
    if(!req.body) throw new Error('Empty body');
    const user = await userScheme.validateAsync(req.body);
    if(user.errors) throw new Error(JSON.stringify(user.errors));
    return user;
}

export const addUser: ViewHandler = async (req, res) => {
    checkUserData(req)
        .then(async (user) => {
            const id = await repository.createUser(user);
            res.send(id);
        })
        .catch((err) => {
            res.status(400);
            res.send(err.toString());
        })
        .finally(() => res.end());

};

export const updateUser: ViewHandler = async (req, res) => {
    const id = req.params.id;
    checkUserData(req)
        .then(async (user) => {
            const updatedUser = await repository.updateUser({...user, id});
            res.send(updatedUser);
        })
        .catch((err) => {
            res.status(400);
            res.send(err.toString());
        })
        .finally(() => res.end());
};

export const deleteUser: ViewHandler = async (req, res) => {
    const id = req.params.id;
    await repository.deleteUser(id);
    res.send(id);
    res.end();
};