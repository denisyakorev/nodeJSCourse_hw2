import {DataTypes} from "sequelize";
import { sequelize } from "../config/connect";
import { GroupModel } from "./group";
import { UserModel } from "./user";


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