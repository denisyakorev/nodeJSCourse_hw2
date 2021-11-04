import Joi from "joi";
import passwordComplexity from 'joi-password-complexity';
import {Request} from "express";
import {User} from "../types";
import {IRepository} from "../repository";

export const checkUserData = async (req: Request): Promise<Omit<User, "id" | "isDeleted">> => {
    if(!req.body) throw new Error('Empty body');
    const user = await userScheme.validateAsync(req.body);
    if(user.errors) throw new Error(JSON.stringify(user.errors));
    return user;
}

export const loginValidation = async (value: string, repository:IRepository): Promise<string> => {
    const isLoginAlreadyExists = await repository.isLoginExists(value);
    if (isLoginAlreadyExists) {
        throw new Error('login already exists');
    } else {
        return value;
    }
}

