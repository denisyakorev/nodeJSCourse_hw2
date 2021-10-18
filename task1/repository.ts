import { User } from "./types";
import { v4 as uuidv4 } from 'uuid';

export type IRepository = {
    createUser: (user: Omit<User, "id">) => Promise<string>;
    deleteUser: (user: User) => Promise<boolean>;
    getAutoSuggestUsers: (loginSubstring: string, limit: number) => Promise<User[]>;
    getUser: (id: number) => Promise<User | undefined>;
    updateUser: (user: User) => Promise<User>;
};

export class Repository implements IRepository {
    users: User[] = [];

    createUser = async (user: Omit<User, "id">): Promise<string> => {
        const id = uuidv4();
        this.users.push({
            ...user,
            id
        });
        return id;
    };

    //TODO
    deleteUser = async (user: User): Promise<boolean> => {
        return false;
    };

    //TODO
    getAutoSuggestUsers = async (loginSubstring: string, limit: number): Promise<User[]> => {
        return [];
    }

    //TODO
    getUser = async (id: number): Promise<User | undefined> => {
        return undefined;
    }

    //TODO
    updateUser = async (user: User): Promise<User> => {
        return user;
    }
}