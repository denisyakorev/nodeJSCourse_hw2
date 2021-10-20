import {Request, Response} from "express";
import {Repository} from "../repository";

export type ViewHandler = (req: Request, res: Response) => void;

export const homepage: ViewHandler = (req, res) => {
    res.send("Please, use /user route");
};

export const getUser: ViewHandler = async (req, res) => {
  const id = req.params.id;
  const repo = new Repository();
  const user = await repo.getUser(id);
  if (user) {
      res.json(user);
  } else {
      res.sendStatus(404);
  }
  res.end();
};