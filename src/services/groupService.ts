import {Group, Permissions} from "../models";
import { IGroupRepository } from "../repositories/groupRepository";

export class groupService {
    private repository: IGroupRepository;

    constructor(repository: IGroupRepository) {
        this.repository = repository;
    }

    // TODO
    getGroup = async (groupId: string): Promise<Group> => {
        return Promise.resolve({
            id: '1',
            name: 'group1',
            permissions: ['READ'] as unknown as typeof Permissions[number],
        } as Group);
    };

    // TODO
    getGroups = async (): Promise<Group[]> => {
        return Promise.resolve([] as Group[]);
    };

    // TODO
    createGroup = async (group: Omit<Group, 'id'>): Promise<Group> => {
        return Promise.resolve({
            id: '1',
            name: 'group1',
            permissions: ['READ'] as unknown as typeof Permissions[number],
        } as Group);
    };

    // TODO
    updateGroup = async (group: Group): Promise<Group> => {
       return Promise.resolve({
           id: '1',
           name: 'group1',
           permissions: ['READ'] as unknown as typeof Permissions[number],
       } as Group);
    };

    // TODO
    deleteGroup = async (groupId: string): Promise<boolean> => {
        return Promise.resolve(false);
    };
}