import { ServiceError } from ".";
import { User } from "../models";
import {IUserRepository, PublicUser} from "../data-access/userRepository/userRepositoryInterface";

export interface IUserService {
    getUser: (userId: string) => Promise<User | undefined>;
    getAutoSuggest: (loginSubstring: string | undefined, limit: number) => Promise<User[]>;
    createUser: (user: PublicUser) => Promise<string>;
    updateUser: (user: Omit<User, "isDeleted">) => Promise<User | Omit<User, "isDeleted">>;
    deleteUser: (userId: string) => Promise<boolean>;
}

export class userService implements IUserService {
    private repository: IUserRepository;

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    private isLoginExists = async (login: string): Promise<boolean> => {
        return await this.repository.isLoginExists(login);
    };

    private getExistingUser = async (userId: string): Promise<User> => {
        const existingUser = await this.repository.getUser(userId);
        if (!existingUser) {
            throw new ServiceError('There is no user with such id', true);
        }
        return existingUser
    };

    getUser = async (userId: string): Promise<User | undefined> => {
        return await this.getExistingUser(userId);
    };

    getAutoSuggest = async (loginSubstring: string | undefined, limit: number): Promise<User[]> => {
        if (loginSubstring && limit) {
            return await this.repository.getAutoSuggestUsers(loginSubstring, limit);
        } else {
            return [];
        }
    };

    createUser = async (user: PublicUser): Promise<string> => {
        if (await this.isLoginExists(user.login)) {
           throw new ServiceError('Login already exists', true);
        }
        return this.repository.createUser(user);
    };

    updateUser = async (user: Omit<User, "isDeleted">): Promise<User | Omit<User, "isDeleted">> => {
        const existingUser = await this.getExistingUser(user.id);
        if (existingUser.login !== user.login && await this.isLoginExists(user.login)) {
            throw new ServiceError('Login already exists', true);
        }
        return await this.repository.updateUser(user);
    };

    deleteUser = async (userId: string): Promise<boolean> => {
        const existingUser = await this.getExistingUser(userId);
        return await this.repository.deleteUser(existingUser.id);
    };
};