import { User } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import {IRepository, PublicUser} from "./userRepositoryInterface";

export class UserInMemoryRepository implements IRepository {
    users: User[] = [];

    private static repository?: IRepository
    public static createRepository = () => {
        if (!UserInMemoryRepository.repository) {
            UserInMemoryRepository.repository = new UserInMemoryRepository();
        }
        return UserInMemoryRepository.repository;
    }

    createUser = async (user: PublicUser): Promise<string> => {
        try {
            const id = uuidv4();
            this.users.push({
                ...user,
                id,
                isDeleted: false,
            });
            return id;
        } catch (e) {
            const message = 'Error during creating user: ' + e;
            console.log(message);
            throw new Error(message);
        }

    };

    deleteUser = async (id: string): Promise<boolean> => {
        try{
            const existingUser = await this.getUser(id);
            if(existingUser) {
                existingUser.isDeleted = true;
            };
            return true;
        } catch(e) {
            const message = 'Error during deleting user: ' + e;
            console.log(message);
            throw new Error(message);
        }

    };

    private getUsersSortedByLogin = (): User[] => {
        return [...this.users]
            .sort( (firstUser, secondUser) => {
                if (firstUser.login > secondUser.login) return 1;
                if (firstUser.login < secondUser.login) return -1;
                return 0;
            }
        );
    }

    getAutoSuggestUsers = async (loginSubstring: string, limit: number): Promise<User[]> => {
        try{
            let result = [];
            const sortedUsers = this.getUsersSortedByLogin();
            for(const user of sortedUsers) {
                if (result.length === limit) break;
                if(user.login.includes(loginSubstring)) {
                    result.push(user);
                }
            };
            return result.sort();
        } catch(e) {
            const message = 'Error during finding auto suggests: ' + e;
            console.log(message);
            throw new Error(message);
        }

    }

    getUser = async (id: string): Promise<User | undefined> => {
        return this.users.find(user => user.id === id);
    }

    isLoginExists = async (login: string): Promise<boolean> => {
        const user = this.users.find(user => user.login === login);
        return user !== undefined;
    }

    updateUser = async (user: Omit<User, "isDeleted">): Promise<User | Omit<User, "isDeleted">> => {
        try {
            const userIdx = this.users.findIndex(userFromList => userFromList.id === user.id);
            if (userIdx === -1) return user;

            this.users = [
                ...this.users.slice(0, userIdx),
                {
                    ...user,
                    id: this.users[userIdx].id,
                    isDeleted: this.users[userIdx].isDeleted
                },
                ...this.users.slice(userIdx + 1)
            ]
            return this.users[userIdx];
        } catch(e) {
            const message = 'Error during updating user: ' + e;
            console.log(message);
            throw new Error(message);
        }
    }
}