import { User } from "./types";
import { v4 as uuidv4 } from 'uuid';

export type IRepository = {
    createUser: (user: PublicUser) => Promise<string>;
    deleteUser: (id: string) => Promise<boolean>;
    getAutoSuggestUsers: (loginSubstring: string, limit: number) => Promise<User[]>;
    getUser: (id: string) => Promise<User | undefined>;
    isLoginExists: (login: string) => Promise<boolean>;
    updateUser: (user: Omit<User, "isDeleted">) => Promise<User | Omit<User, "isDeleted">>;
};

export type PublicUser = Omit<User, "id" | "isDeleted">;

export class Repository implements IRepository {
    users: User[] = [];

    private static repository?: IRepository
    public static createRepository = () => {
        if (!Repository.repository) {
            Repository.repository = new Repository();
        }
        return Repository.repository;
    }

    createUser = async (user: PublicUser): Promise<string> => {
        const id = uuidv4();
        this.users.push({
            ...user,
            id,
            isDeleted: false,
        });
        return id;
    };

    deleteUser = async (id: string): Promise<boolean> => {
        const existingUser = await this.getUser(id);
        if(existingUser) {
            existingUser.isDeleted = true;
        };
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

    isLoginExists = async (login: string): Promise<boolean> => {
        const user = this.users.find(user => user.login === login);
        return user !== undefined;
    }

    updateUser = async (user: Omit<User, "isDeleted">): Promise<User | Omit<User, "isDeleted">> => {
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
    }
}