import { User } from "../../models";

export type IUserRepository = {
    createUser: (user: PublicUser) => Promise<string>;
    deleteUser: (id: string) => Promise<boolean>;
    getAutoSuggestUsers: (loginSubstring: string, limit: number) => Promise<User[]>;
    getUser: (id: string) => Promise<User | undefined>;
    isLoginExists: (login: string) => Promise<boolean>;
    updateUser: (user: Omit<User, "isDeleted">) => Promise<User | Omit<User, "isDeleted">>;
};

export type PublicUser = Omit<User, "id" | "isDeleted">;