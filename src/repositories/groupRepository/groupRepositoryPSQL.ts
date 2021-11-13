import { IGroupRepository } from ".";
import {DataTypes, Model, Op, Optional, Sequelize} from "sequelize";
import {Group, Permissions} from "../../models";

export const sequelize = new Sequelize(process.env.PSQLConnectionString as string);

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

export class GroupPSQLRepository implements IGroupRepository {
    private storage: Sequelize;
    private static repository?: IGroupRepository
    public static createRepository = () => {
        if (!GroupPSQLRepository.repository) {
            GroupPSQLRepository.repository = new GroupPSQLRepository();
        }
        return GroupPSQLRepository.repository as IGroupRepository;
    }

    constructor () {
        this.storage = sequelize;
        this.storage.authenticate()
            .then(() => console.log('Connection has been established successfully.'))
            .catch((error) => console.error('Unable to connect to the database:', error))
    }

    getGroup = async (groupId: string): Promise<Group | undefined> => {
        const group = await GroupModel.findByPk(groupId);
        return group ? group : undefined;
    };

    getGroups = async (): Promise<Group[]> => {
        return await GroupModel.findAll({
            order: [
                ['name', 'ASC']
            ]
        });
    };

    isNameExists = async (groupName: string): Promise<boolean> => {
        const group = await GroupModel.findOne({
            where: {
                name: {
                    [Op.in]: [groupName]
                },
            },
        });
        return !!group;
    };

    createGroup = async (group: Omit<Group, 'id'>): Promise<string> => {
        const createdGroup = await GroupModel.create(group);
        return createdGroup.id;
    };

    updateGroup = async (group: Group): Promise<Group> => {
        await GroupModel.update({
            name: group.name,
            permissions: group.permissions,
        }, {
            where: {
                id: {
                    [Op.in]: [group.id],
                },
            },
        });
        const updatedGroup =  await this.getGroup(group.id);
        return updatedGroup ? updatedGroup : group;
    };

    deleteGroup = async (groupId: string): Promise<boolean> => {
        try {
            await GroupModel.destroy({
                where: {
                    id: {
                        [Op.in]: [groupId]
                    }
                }
            });
            return true;
        } catch(error) {
            return false;
        }
    };
};