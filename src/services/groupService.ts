import {provide} from "inversify-binding-decorators";
import {inject} from "inversify";
import { ServiceError } from ".";
import {Group} from "../models";
import { IGroupRepository } from "../data-access/groupRepository";
import {TYPES} from "../constants/types";

export interface IGroupService {
    getExistingGroup: (groupId: string) => Promise<Group>;
    getGroup: (groupId: string) => Promise<Group | undefined>;
    getGroups: () => Promise<Group[]>;
    createGroup: (group: Omit<Group, 'id'>) => Promise<string>;
    updateGroup: (group: Group) => Promise<Group>;
    deleteGroup: (groupId: string) => Promise<boolean>;
    addUsersToGroup: (groupId: string, userIds: string[]) => Promise<boolean>;
}

@provide(TYPES.IGroupService)
export class groupService implements IGroupService {
    private repository: IGroupRepository;

    constructor(@inject(TYPES.IGroupRepository) repository: IGroupRepository) {
        this.repository = repository;
    }

    getExistingGroup = async (groupId: string): Promise<Group> => {
        const existingGroup = await this.repository.getGroup(groupId);
        if (!existingGroup) {
            throw new ServiceError('There is no group with such id', true);            
        }
        return existingGroup
    };

    getGroup = async (groupId: string): Promise<Group | undefined> => {
        return await this.getExistingGroup(groupId);
    };

    getGroups = async (): Promise<Group[]> => {
        return this.repository.getGroups();
    };

    createGroup = async (group: Omit<Group, 'id'>): Promise<string> => {
        if (await this.repository.isNameExists(group.name)) {
            throw new ServiceError('Group with this name already exists', true);
        }
        return this.repository.createGroup(group);
    };

    updateGroup = async (group: Group): Promise<Group> => {
        const existingGroup = await this.getExistingGroup(group.id);
        if (existingGroup.name !== group.name && await this.repository.isNameExists(group.name)) {
            throw new ServiceError('Login already exists', true);
        }
        return await this.repository.updateGroup(group);
    };

    deleteGroup = async (groupId: string): Promise<boolean> => {
        const existingGroup = await this.getExistingGroup(groupId);
        return await this.repository.deleteGroup(existingGroup.id);
    };

    addUsersToGroup = async (groupId: string, userIds: string[]): Promise<boolean> => {
      return await this.repository.addUsersToGroup(groupId, userIds);
    };
}
