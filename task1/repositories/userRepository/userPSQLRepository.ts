import { User } from "../../types";
import {IRepository, PublicUser} from "./userRepositoryInterface";
import {Op, Sequelize} from "sequelize";
import { UserModel } from "../../models/UserSequelizeModel";

export const sequelize = new Sequelize(process.env.PSQLConnectionString as string);

export class UserPSQLRepository implements IRepository {
    private storage: Sequelize;

    private static repository?: IRepository
    public static createRepository = () => {
        if (!UserPSQLRepository.repository) {
            UserPSQLRepository.repository = new UserPSQLRepository();
        }
        return UserPSQLRepository.repository;
    }

    constructor () {
        this.storage = sequelize;
        this.storage.authenticate()
            .then(() => console.log('Connection has been established successfully.'))
            .catch((error) => console.error('Unable to connect to the database:', error))
    }

    createUser = async (user: PublicUser): Promise<string> => {
        const createdUser = await UserModel.create(user);
        return createdUser.id;
    };

    deleteUser = async (userId: string): Promise<boolean> => {
        await UserModel.update({isDeleted: true}, {
            where: {
                id: userId,
            },
        });
        return true;
    };

    getAutoSuggestUsers = async (loginSubstring: string, limit: number): Promise<User[]> => {
        return await UserModel.findAll({
            where: {
                login: {
                    [Op.substring]: loginSubstring,
                },
                isDeleted: {
                    [Op.not]: true,
                }
            },
            order: [
                ['login', 'ASC']
            ],
            limit
        });
    }

    getUser = async (id: string): Promise<User | undefined> => {
        const user = await UserModel.findByPk(id);
        return user ? user : undefined;
    }

    isLoginExists = async (login: string): Promise<boolean> => {
        const user = await UserModel.findOne({
            where: {
                login: {
                    [Op.like]: login
                },
            },
        });
        return user !== undefined;
    }

    updateUser = async (user: Omit<User, "isDeleted">): Promise<User | Omit<User, "isDeleted">> => {
        const updatedUsers = await UserModel.update({...user}, {
            where: {
                id: {
                    [Op.like]: user.id,
                },
            },
        });

        return updatedUsers[1][0];
    }
}