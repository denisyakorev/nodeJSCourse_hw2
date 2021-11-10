import {IRepository, PublicUser} from "./userRepositoryInterface";
import {DataTypes, Model, Op, Optional, Sequelize} from "sequelize";
import {User} from "../../models";


export const sequelize = new Sequelize(process.env.PSQLConnectionString as string);

interface UserInterface extends Model<User, Optional<User, 'id' | 'isDeleted'>>, User {};

export const UserModel = sequelize.define<UserInterface>('User', {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
},{
    tableName: 'Users',
    indexes: [{fields: ['id', 'login']}],
    timestamps: false,
});

export class UserPSQLRepository implements IRepository {
    private storage: Sequelize;

    private static repository?: IRepository
    public static createRepository = () => {
        if (!UserPSQLRepository.repository) {
            UserPSQLRepository.repository = new UserPSQLRepository();
        }
        return UserPSQLRepository.repository as IRepository;
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
        const updatedUsers = await UserModel.update({
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