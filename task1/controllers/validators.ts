import Joi, { ExternalValidationFunction } from "joi";
import {Repository} from "../repository";
import passwordComplexity from 'joi-password-complexity';
const repository = Repository.createRepository();

const passwordConfig = {
    min: 2,
    max: 20,
    numeric: 1,
    lowerCase: 1
};

export const loginValidation = async (value: string): Promise<string> => {
    const isLoginAlreadyExists = await repository.isLoginExists(value);
    if (isLoginAlreadyExists) {
        throw new Error('login already exists');
    } else {
        return value;
    }
}

export const userScheme = Joi.object({
    login: Joi.string().required(),
    password: passwordComplexity(passwordConfig),
    age: Joi.number().min(4).max(130).required()
});