import { User } from "../../dto";

export type UserDAOInterface = {
    createUser: (user: PublicUser) => Promise<string>;
    deleteUser: (id: string) => Promise<boolean>;
    getAutoSuggestUsers: (loginSubstring: string, limit: number) => Promise<User[]>;
    getUserByCredentials: (login: string, password: string) => Promise<User | undefined>;
    getUser: (id: string) => Promise<User | undefined>;
    isLoginExists: (login: string) => Promise<boolean>;
    updateUser: (user: Omit<User, "isDeleted">) => Promise<User | Omit<User, "isDeleted">>;
};

export type PublicUser = Omit<User, "id" | "isDeleted">;