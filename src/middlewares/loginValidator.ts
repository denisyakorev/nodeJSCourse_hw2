import {NextFunction, Request, Response} from "express";
import {genericValidator} from "./genericValidator";
import Joi from "joi";

export const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
    genericValidator(req, res, next, loginScheme);
};

const loginScheme = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
});