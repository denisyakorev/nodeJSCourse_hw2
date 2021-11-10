import {DataTypes, Model, ModelDefined, Optional, Sequelize} from "sequelize";

export const sequelize = new Sequelize(process.env.PSQLConnectionString as string);

export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};

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