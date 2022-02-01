import {IJwtService, IUserService} from "../services";
import {inject} from "inversify";
import {TYPES} from "../constants/types";
import {controller, httpPost} from "inversify-express-utils";
import {loginValidator} from "../middlewares/loginValidator";
import {ViewHandler} from "./controllerTypes";
import {Request, Response} from "express";


export interface IAuthController {
    login: ViewHandler;
};

@controller('/login')
export class AuthController implements IAuthController {
    private userService: IUserService;
    private jwtService: IJwtService;

    constructor(
        @inject(TYPES.IUserService) userService: IUserService,
        @inject(TYPES.IJwtService) jwtService: IJwtService
    ) {
        this.userService =  userService;
        this.jwtService = jwtService;
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
                accessToken: this.jwtService.sign({id: user.id}),
                refreshToken: this.jwtService.getRefreshToken({id: user.id}),
            });
        }
    };
};