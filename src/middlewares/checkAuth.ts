import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).send("Unauthorised");
    }

    if(Array.isArray(token)) {
        token = token[0];
    }

    try {
        req.body.userId = jwt.verify(token, process.env.secret || 'secret');
    } catch (err) {
        return res.status(403).send("Invalid Token");
    }
    return next();
};