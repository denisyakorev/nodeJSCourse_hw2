import {NextFunction, Request, Response} from "express";
import {genericValidator} from "./genericValidator";
import Joi from "joi";

export const groupUsersValidator = async (req: Request, res: Response, next: NextFunction) => {
    genericValidator(req, res, next, groupUsersScheme);
};

const groupUsersScheme = Joi.object({
    userIds: Joi.array().items(Joi.string()),
});