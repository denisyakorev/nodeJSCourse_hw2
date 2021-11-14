import {Group} from "../../models";

export type IGroupRepository = {
    getGroup: (groupId: string) => Promise<Group | undefined>;
    getGroups: () => Promise<Group[]>;
    isNameExists: (groupName: string) => Promise<boolean>;
    createGroup: (group: Omit<Group, 'id'>) => Promise<string>;
    updateGroup: (group: Group) => Promise<Group>;
    deleteGroup: (groupId: string) => Promise<boolean>;
    addUsersToGroup: (groupId: string, userIds: string[]) => Promise<boolean>;
};