import {IUserRepository, PublicUser} from "./userRepositoryInterface";
import {Op, Sequelize} from "sequelize";
import {User} from "../../models";
import { UserModel } from "../EntityModels";
import { TYPES } from "../../constants/types";
import { provide } from "inversify-binding-decorators";


export const sequelize = new Sequelize(process.env.PSQLConnectionString as string);

@provide(TYPES.IUserRepository)
export class userRepository implements IUserRepository {
    private storage: Sequelize;

    private static repository?: IUserRepository
    public static createRepository = () => {
        if (!userRepository.repository) {
            userRepository.repository = new userRepository();
        }
        return userRepository.repository as IUserRepository;
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
                    [Op.in]: [login]
                },
            },
        });
        return !!user;
    }

    updateUser = async (user: Omit<User, "isDeleted">): Promise<User | Omit<User, "isDeleted">> => {
        await UserModel.update({
            login: user.login,
            password: user.password,
            age: user.age
        }, {
            where: {
                id: {
                    [Op.in]: [user.id],
                },
            },
        });
        const updatedUser =  await this.getUser(user.id);
        return updatedUser ? updatedUser : user;
    }
}