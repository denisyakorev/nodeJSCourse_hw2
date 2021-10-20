import {Request, Response} from "express";
import {Repository} from "../repository";

const repository = new Repository();

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