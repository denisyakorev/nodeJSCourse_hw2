import {IRepository, PublicUser, UserRepository} from "../repositories/userRepository";
import {User} from "../types";

export class UserServiceError extends Error {
    constructor(public message: string, public isClientDataIncorrect: boolean) {
        super(message);
    }
}

export class userService {
    private repository: IRepository;

    constructor() {
        this.repository = UserRepository.createRepository();
    }

    private isLoginExists = async (login: string): Promise<boolean> => {
        return await this.repository.isLoginExists(login);
    };

    getUser = async (userId: string): Promise<User | undefined> => {
        return await this.repository.getUser(userId);
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
        const existingUser = await this.repository.getUser(user.id);
        if (!existingUser) {
            throw new UserServiceError('There is no user with such id', true);
        }
        if (existingUser.login !== user.login && await this.isLoginExists(user.login)) {
            throw new UserServiceError('Login already exists', true);
        }
        return await this.repository.updateUser(user);
    };

    deleteUser = async (userId: string): Promise<boolean> => {
        return await this.repository.deleteUser(userId);
    };
};