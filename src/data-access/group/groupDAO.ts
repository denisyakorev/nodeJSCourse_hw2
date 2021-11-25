import { GroupDAOInterface } from ".";
import {Op, Sequelize} from "sequelize";
import {Group} from "../../dto";
import {GroupModel} from "../../models/group";
import {provide} from "inversify-binding-decorators";
import {TYPES} from "../../constants/types";
import { GroupUser } from "../../models/userToGroup";

export const sequelize = new Sequelize(process.env.PSQLConnectionString as string);

@provide(TYPES.IGroupRepository)
export class GroupDAO implements GroupDAOInterface {
    private storage: Sequelize;
    private static repository?: GroupDAOInterface
    public static createRepository = () => {
        if (!GroupDAO.repository) {
            GroupDAO.repository = new GroupDAO();
        }
        return GroupDAO.repository as GroupDAOInterface;
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

    addUsersToGroup = async (groupId: string, userIds: string[]): Promise<boolean> => {
        try{
            await sequelize.transaction(async (t) => {
                userIds.forEach( async (userId) => {
                    await GroupUser.create({
                        GroupId: groupId,
                        UserId: userId
                    })
                });
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};