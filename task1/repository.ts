import { User } from "./types";
import { v4 as uuidv4 } from 'uuid';

export type IRepository = {
    createUser: (user: Omit<User, "id">) => Promise<string>;
    deleteUser: (user: User) => Promise<boolean>;
    getAutoSuggestUsers: (loginSubstring: string, limit: number) => Promise<User[]>;
    getUser: (id: string) => Promise<User | undefined>;
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

    deleteUser = async (user: User): Promise<boolean> => {
        const existingUser = await this.getUser(user.id);
        if (existingUser) {
            this.updateUser({
                ...user,
                isDeleted: true
            });
        }
       return true;
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
        let result = [];
        const sortedUsers = this.getUsersSortedByLogin();
        for(const user of sortedUsers) {
          if (result.length === limit) break;
          if(user.login.includes(loginSubstring)) {
              result.push(user);
          }
        };
        return result.sort();
    }

    getUser = async (id: string): Promise<User | undefined> => {
        return this.users.find(user => user.id === id);
    }

    updateUser = async (user: User): Promise<User> => {
        const userIdx = this.users.findIndex(userFromList => userFromList.id === user.id);
        if (userIdx !== -1) {
            this.users = [
                ...this.users.slice(0, userIdx),
                user,
                ...this.users.slice(userIdx + 1)
            ]
        }
        return user;
    }
}