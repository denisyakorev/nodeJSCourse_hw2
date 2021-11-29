import {IUserService} from "../services";
import {inject} from "inversify";
import jwt from 'jsonwebtoken';
import {TYPES} from "../constants/types";
import {controller, httpPost} from "inversify-express-utils";
import {loginValidator} from "../middlewares/loginValidator";
import {randomUUID} from "crypto";
import {ViewHandler} from "./controllerTypes";
import {Request, Response} from "express";

export type Tokens = {
    accessToken: string;
    refreshToken: string;
};

export interface IAuthController {
    login: ViewHandler;
};

@controller('/login')
export class AuthController implements IAuthController {
    private userService: IUserService;

    constructor(@inject(TYPES.IUserService) userService: IUserService) {
        this.userService =  userService;
    }

    @httpPost('/', loginValidator)
    async login (req: Request, res: Response): Promise<void> {
        const user = await this.userService.getUserByCredentials(req.body.login, req.body.password);
        console.log('user :>>', user);
        if (!user) {
            res.status(404);
            res.end();
        } else {
            res.json({
                accessToken: jwt.sign({id: user.id}, process.env.secret || 'secret'),
                refreshToken: randomUUID(),
            });
        }
    };
};