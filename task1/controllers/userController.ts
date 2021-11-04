import {Request, Response} from "express";
import {userService, UserServiceError} from "../services";

const service = new userService();

export type ViewHandler = (req: Request, res: Response) => void;

export const getUser: ViewHandler = async (req, res) => {
  const id = req.params.id;
  try {
      const user = await service.getUser(id);
      if (user) {
          res.json(user);
      } else {
          res.status(404);
      }
  } catch (e) {
      res.status(500);
  } finally {
      res.end();
  }
};

export const getAutoSuggestUsers: ViewHandler = async (req, res) => {
    const loginSubstring = req.query.loginSubstring?.toString();
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 0;
    try {
        return await service.getAutoSuggest(loginSubstring, limit);
    } catch (e) {
        res.status(500);
    } finally {
        res.end();
    }
};

export const addUser: ViewHandler = async (req, res) => {
    try {
        const id = await service.createUser(req.body)
        res.status(201);
        res.send(id);
    }catch(error) {
        if ((error as UserServiceError).isClientDataIncorrect) {
            res.status(400);
        } else {
            res.status(500);
        }
        res.send((error as Error).toString());
    }
    res.end();
};

export const updateUser: ViewHandler = async (req, res) => {
    try {
        const updatedUser = await service.updateUser({...req.body, id: req.params.id});
        res.send(updatedUser);
    } catch(error) {
        if ((error as UserServiceError).isClientDataIncorrect) {
            res.status(400);
        } else {
            res.status(500);
        }
        res.send((error as Error).toString());
    }
    res.end();
};

export const deleteUser: ViewHandler = async (req, res) => {
    const id = req.params.id;
    try {
        await service.deleteUser(id);
        res.send(id);
    } catch(err) {
        console.log(err);
        res.status(500);
    } finally {
        res.end();
    }
};