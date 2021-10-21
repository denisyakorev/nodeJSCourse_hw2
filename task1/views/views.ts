import {Request, Response} from "express";
import {Repository} from "../repository";
import { User } from "../types";
import Joi from 'joi';

const repository = new Repository();
const userScheme = Joi.object({
    login: Joi.string().required(),
    password: [Joi.string().required(), Joi.number().required()],
    age: Joi.number().min(4).max(130).required()
});

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

const checkUserData = (req: Request): Omit<User, "id" | "isDeleted"> => {
    if(!req.body) throw new Error('Incorrect body');
    const login = req.body.login;
    const age = req.body.age;
    const password = req.body.password;
    if(!login || !age || !password) throw new Error('Incorrect data');

    return {login, age, password};
}

export const addUser: ViewHandler = async (req, res) => {
    try {
        const user = checkUserData(req);
        const id = await repository.createUser(user);
        res.send(id);
    } catch(e) {
      res.sendStatus(400);
    }
    res.end();
};

export const updateUser: ViewHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const user = {
            ...checkUserData(req),
            id
        };
        res.send(await repository.updateUser(user));
    } catch(e) {
        res.sendStatus(400);
    }
    res.end();
};

export const deleteUser: ViewHandler = async (req, res) => {
    const id = req.params.id;
    await repository.deleteUser(id);
    res.send(id);
    res.end();
};