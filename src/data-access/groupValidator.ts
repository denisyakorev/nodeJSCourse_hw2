import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {Permissions} from "../models";
import {genericValidator} from "./utils";

export const groupValidator = async (req: Request, res: Response, next: NextFunction) => {
    genericValidator(req, res, next, groupScheme);
};

const groupScheme = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string().valid(...Permissions)),
});