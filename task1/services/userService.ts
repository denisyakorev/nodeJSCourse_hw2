import {UserInMemoryRepository} from "../repositories/userRepository/userInMemoryRepository";
import {IRepository, PublicUser} from "../repositories/userRepository/userRepositoryInterface";
import {User} from "../types";

export class UserServiceError extends Error {
    constructor(public message: string, public isClientDataIncorrect: boolean) {
        super(message);
    }
}

export class userService {
    private repository: IRepository;

    constructor(repository: IRepository) {
        this.repository = repository;
    }

    private isLoginExists = async (login: string): Promise<boolean> => {
        return await this.repository.isLoginExists(login);
    };

    private getExistingUser = async (userId: string): Promise<User> => {
        const existingUser = await this.repository.getUser(userId);
        if (!existingUser) {
            throw new UserServiceError('There is no user with such id', true);
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
           throw new UserServiceError('Login already exists', true);
        }
        return this.repository.createUser(user);
    };

    updateUser = async (user: Omit<User, "isDeleted">): Promise<User | Omit<User, "isDeleted">> => {
        const existingUser = await this.getExistingUser(user.id);
        if (existingUser.login !== user.login && await this.isLoginExists(user.login)) {
            throw new UserServiceError('Login already exists', true);
        }
        return await this.repository.updateUser(user);
    };

    deleteUser = async (userId: string): Promise<boolean> => {
        const existingUser = await this.getExistingUser(userId);
        return await this.repository.deleteUser(existingUser.id);
    };
};