import {NextFunction, Request, Response} from "express";
import Joi from "joi";

export const genericValidator = async (req: Request, res: Response, next: NextFunction, joiScheme: Joi.ObjectSchema) => {
    try {
        if(!req.body) throw new Error('Empty body');
        const validatedObj = await joiScheme.validateAsync(req.body);
        if(validatedObj.errors) throw new Error(JSON.stringify(validatedObj.errors));
        req.body = validatedObj;
        next();
    } catch(error) {
        res.status(400);
        res.send((error as Error).message);
        res.end();
    }
};