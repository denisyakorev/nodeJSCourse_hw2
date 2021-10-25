import {Request, Response} from "express";
import {Repository} from "../repository";
import {checkUserData, loginValidation} from "./validators";

const repository = Repository.createRepository();

export type ViewHandler = (req: Request, res: Response) => void;

export const homepage: ViewHandler = (req, res) => {
    res.send("Please, use /user route");
};

export const getUser: ViewHandler = async (req, res) => {
  const id = req.params.id;
  try {
      const user = await repository.getUser(id);
      if (user) {
          res.json(user);
      } else {
          res.sendStatus(404);
      }
  } catch (e) {
      res.sendStatus(500);
  } finally {
      res.end();
  }
};

export const getAutoSuggestUsers: ViewHandler = async (req, res) => {
    const loginSubstring = req.query.loginSubstring?.toString();
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 0;

    try {
        if (loginSubstring && limit) {
            const users = await repository.getAutoSuggestUsers(loginSubstring, limit);
            res.json(users);
        } else {
            res.sendStatus(400);
        }
    } catch (e) {
        res.sendStatus(500);
    } finally {
        res.end();
    }
};

export const addUser: ViewHandler = async (req, res) => {
    let user;
    try {
        user = await checkUserData(req.body);
        await loginValidation(user.login, repository);
    }catch(err) {
        res.status(400);
        res.send((err as Error).toString());
        return res.end();
    }

    try {
        const id = await repository.createUser(user);
        res.status(201);
        res.send(id);
    } catch (e) {
        console.log(e);
        res.status(500)
    } finally {
        res.end();
    }
};

export const updateUser: ViewHandler = async (req, res) => {
    const id = req.params.id;
    let user;
    try {
        user = await checkUserData(req.body);
    } catch(err) {
        res.status(400);
        res.send((err as Error).toString());
        return res.end();
    }

    try {
        const updatedUser = await repository.updateUser({...user, id});
        res.send(updatedUser);
    } catch(err) {
        console.log(err);
        res.status(500);
    } finally {
        res.end();
    }
};

export const deleteUser: ViewHandler = async (req, res) => {
    const id = req.params.id;
    try {
        await repository.deleteUser(id);
        res.send(id);
    } catch(err) {
        console.log(err);
        res.status(500);
    } finally {
        res.end();
    }
};