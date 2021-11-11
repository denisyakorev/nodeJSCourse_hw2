import { ServiceError } from ".";
import {Group, Permissions} from "../models";
import { IGroupRepository } from "../repositories/groupRepository";

export class groupService {
    private repository: IGroupRepository;

    constructor(repository: IGroupRepository) {
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

    createGroup = async (group: Omit<Group, 'id'>): Promise<Group> => {
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
}