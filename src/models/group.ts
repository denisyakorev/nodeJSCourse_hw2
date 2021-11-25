import {DataTypes, Model, Optional} from "sequelize";
import {Group, Permissions} from "../dto";
import {sequelize} from "./connect";

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

