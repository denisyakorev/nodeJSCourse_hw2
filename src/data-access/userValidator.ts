import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import {NextFunction, Request, Response} from "express";
import {genericValidator} from "./utils";

export const userValidator = async (req: Request, res: Response, next: NextFunction) => {
    genericValidator(req, res, next, userScheme);
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