import {NextFunction, Request, Response} from "express";
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { config } from '../config/config';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).send("Unauthorised");
    }

    if(Array.isArray(token)) {
        token = token[0];
    }

    try {
        jwt.verify(token, config.jwtSecret);
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return res.status(401).send("Expired token");
        }
        return res.status(403).send("Invalid Token");
    }
    return next();
};