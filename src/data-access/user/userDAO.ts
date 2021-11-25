import {UserDAOInterface, PublicUser} from "./userDAOInterface";
import {Op, Sequelize} from "sequelize";
import {User} from "../../dto";
import { TYPES } from "../../constants/types";
import { provide } from "inversify-binding-decorators";
import { UserModel } from "../../models/user";


export const sequelize = new Sequelize(process.env.PSQLConnectionString as string);

@provide(TYPES.IUserRepository)
export class UserDAO implements UserDAOInterface {
    private storage: Sequelize;

    private static repository?: UserDAOInterface
    public static createRepository = () => {
        if (!UserDAO.repository) {
            UserDAO.repository = new UserDAO();
        }
        return UserDAO.repository as UserDAOInterface;
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