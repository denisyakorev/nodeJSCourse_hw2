import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import {NextFunction, Request, Response} from "express";

export const userValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body) throw new Error('Empty body');
        const user = await userScheme.validateAsync(req.body);
        if(user.errors) throw new Error(JSON.stringify(user.errors));
        req.body = user;
        next();
    } catch(error) {
        res.status(400);
        res.send((error as Error).message);
        res.end();
    }
};

const passwordConfig = {
    min: 2,
    max: 20,
    numeric: 1,
    lowerCase: 1
};

const userScheme = Joi.object({
    login: Joi.string().required(),
    password: passwordComplexity(passwordConfig),
    age: Joi.number().min(4).max(130).required()
});