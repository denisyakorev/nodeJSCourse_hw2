import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {Group, Permissions, User} from "../models";

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

interface GroupInterface extends Model<Group, Optional<Group, 'id'>>, Group {};

export const GroupModel = sequelize.define<GroupInterface>('Group', {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM({
            values: [...Permissions],
        })),
    }
}, {
    tableName: 'Groups',
    indexes: [{fields: ['id', 'name']}],
    timestamps: false,
});

export const GroupUser = sequelize.define('GroupUsers', {
   GroupId: {
       type: DataTypes.UUIDV4,
       allowNull: false,
   },
    UserId: {
       type: DataTypes.UUIDV4,
       allowNull: false,
    }
}, {
    tableName: 'GroupUsers',
    indexes: [{fields: ['GroupId', 'UserId']}],
});

GroupModel.belongsToMany(UserModel, {through: "GroupUsers"});
UserModel.belongsToMany(GroupModel, {through: "GroupUsers"});