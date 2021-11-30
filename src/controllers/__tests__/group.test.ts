import 'reflect-metadata';
import {Request, Response} from "express";
import {groupController} from "../group";
import {IGroupService} from "../../services";

const getGroupMock = jest.fn();
const updateGroupMock = jest.fn();
const deleteGroupMock = jest.fn();
const addUsersToGroupMock = jest.fn();
const getGroupsMock = jest.fn();
const createGroupMock = jest.fn();

class serviceMock {
    getGroup = getGroupMock;
    updateGroup = updateGroupMock;
    deleteGroup = deleteGroupMock;
    addUsersToGroup = addUsersToGroupMock;
    getGroups = getGroupsMock;
    createGroup = createGroupMock;
}

const controller = new groupController( new serviceMock() as unknown as IGroupService);

const jsonMock = jest.fn();
const statusMock = jest.fn();
const endMock = jest.fn();
const sendMock = jest.fn();
const res = {
    json: jsonMock,
    status: statusMock,
    end: endMock,
    send: sendMock,
}

describe('getGroup', () => {
    beforeEach(() => jest.clearAllMocks());
    it('Должна записывать в ответ значение, которое вернул сервис, если оно корректное', async () => {
        const req = {
            params: {
                id: '1'
            }
        }
        getGroupMock.mockImplementation(async () => Promise.resolve({}));

        await controller.getGroup(req as unknown as Request, res as unknown as Response);

        expect(getGroupMock).toHaveBeenCalledWith('1');
        expect(jsonMock).toHaveBeenCalledWith({});
    });

    it('Должна устанавливать статус 404, если значение некорректное', async () => {
        const req = {
            params: {
                id: '1'
            }
        }
        getGroupMock.mockImplementation(async () => Promise.resolve(undefined));

        await controller.getGroup(req as unknown as Request, res as unknown as Response);

        expect(getGroupMock).toHaveBeenCalledWith('1');
        expect(statusMock).toHaveBeenCalledWith(404);
    });
});

describe('updateGroup', () => {
    beforeEach(() => jest.clearAllMocks());

    it('Должна записывать в ответ значение, которое вернул сервис', async () => {
        const req = {
            params: {
                id: '1',
            },
            body: {
                "login": "log",
            }
        }
        updateGroupMock.mockImplementation(async () => Promise.resolve({}));

        await controller.updateGroup(req as unknown as Request, res as unknown as Response);

        expect(updateGroupMock).toHaveBeenCalledWith({
            id: '1',
            login: 'log',
        });
        expect(sendMock).toHaveBeenCalledWith({});
    });
});

describe('deleteGroup', () => {
    beforeEach(() => jest.clearAllMocks());

    it('Должна записывать в ответ значение, которое вернул сервис', async () => {
        const req = {
            params: {
                id: '1',
            }
        }
        updateGroupMock.mockImplementation(async () => Promise.resolve({}));

        await controller.updateGroup(req as unknown as Request, res as unknown as Response);

        expect(updateGroupMock).toHaveBeenCalledWith({
            id: '1',
            login: 'log',
        });
        expect(sendMock).toHaveBeenCalledWith({});
    });
});

describe('addUsersToGroup', () => {
    beforeEach(() => jest.clearAllMocks());

    it('Должна записывать в ответ значение, которое вернул сервис', async () => {
        const req = {
            params: {
                id: '1',
            },
            body: {
                userIds: ['2', '3'],
            }
        }
        addUsersToGroupMock.mockImplementation(async () => Promise.resolve({}));

        await controller.addUsersToGroup(req as unknown as Request, res as unknown as Response);

        expect(addUsersToGroupMock).toHaveBeenCalledWith('1', ['2', '3']);
        expect(sendMock).toHaveBeenCalledWith({});
        expect(endMock).toHaveBeenCalledTimes(1);
    });
});

describe('getGroups', () => {
    beforeEach(() => jest.clearAllMocks());

    it('Должна записывать в ответ значение, которое вернул сервис', async () => {
        const req = {}
        getGroupsMock.mockImplementation(async () => Promise.resolve([]));

        await controller.getGroups(req as unknown as Request, res as unknown as Response);

        expect(getGroupsMock).toHaveBeenCalled();
        expect(sendMock).toHaveBeenCalledWith([]);
        expect(endMock).toHaveBeenCalled();
    });
});

describe('addGroup', () => {
    beforeEach(() => jest.clearAllMocks());

    it('Должна записывать в ответ значение, которое вернул сервис и устанавливать статус 201', async () => {
        const req = {
            body: {
                login: "log",
            }
        }
        createGroupMock.mockImplementation(async () => Promise.resolve('id'));

        await controller.addGroup(req as unknown as Request, res as unknown as Response);

        expect(createGroupMock).toHaveBeenCalledWith({ login: "log"});
        expect(statusMock).toHaveBeenCalledWith(201);
        expect(sendMock).toHaveBeenCalledWith('id');
        expect(endMock).toHaveBeenCalled();
    });
});