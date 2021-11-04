import {DataTypes, Model, Optional} from "sequelize/types";
import {sequelize} from "../repositories/userRepository/userPSQLRepository";
import {User} from "../types";

export class UserModel extends Model<User, Optional<User, 'id' | 'isDeleted'>> implements User{
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
    public isDeleted!: boolean;
};
UserModel.init({
    id: {
        type: DataTypes.UUIDV4,
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
    }
},{
    sequelize,
    tableName: 'Users',
    indexes: [{fields: ['id', 'login']}]
});