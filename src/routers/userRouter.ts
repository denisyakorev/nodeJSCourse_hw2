import express from 'express';
import {addUser, deleteUser, getAutoSuggestUsers, getUser, updateUser} from "../controllers";
import {userValidator} from "../middlewares/userValidator";

export const userRouter = express.Router();

userRouter.get('/autosuggest', getAutoSuggestUsers);

userRouter.get('/:id', getUser);

userRouter.put('/:id', userValidator, updateUser);

userRouter.delete('/:id', deleteUser);

userRouter.post('/', userValidator, addUser);
