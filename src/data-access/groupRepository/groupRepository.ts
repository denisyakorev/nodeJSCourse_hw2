import { IGroupRepository } from ".";
import {Op, Sequelize} from "sequelize";
import {Group} from "../../models";
import {GroupModel, GroupUser} from "../EntityModels";
import {provide} from "inversify-binding-decorators";
import {TYPES} from "../../constants/types";

export const sequelize = new Sequelize(process.env.PSQLConnectionString as string);

@provide(TYPES.IGroupRepository)
export class groupRepository implements IGroupRepository {
    private storage: Sequelize;
    private static repository?: IGroupRepository
    public static createRepository = () => {
        if (!groupRepository.repository) {
            groupRepository.repository = new groupRepository();
        }
        return groupRepository.repository as IGroupRepository;
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