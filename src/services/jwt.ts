import {AuthUser} from "../dto/authUser";
import {provide} from "inversify-binding-decorators";
import {TYPES} from "../constants/types";
import { config } from "../config/config";
import jwt from 'jsonwebtoken';
import {randomUUID} from "crypto";

export interface IJwtService {
    sign: (authUser: AuthUser) => Promise<string>;
    getRefreshToken: (authUser: AuthUser) => Promise<string>;
}

@provide(TYPES.IUserService)
export class jwtService implements IJwtService {
    private secret = config.jwtSecret;
    sign = (authUser: AuthUser): Promise<string> => {
        return Promise.resolve( jwt.sign(authUser, this.secret) );
    };

    getRefreshToken = (authUser: AuthUser): Promise<string> => {
        return Promise.resolve( randomUUID() );
    };
}