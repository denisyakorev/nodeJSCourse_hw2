import 'reflect-metadata';
import {Request, Response} from "express";

import {userController} from "../user";

import {IUserService} from "../../services";

const getAutoSuggestMock = jest.fn().mockImplementation( (loginSubstring, limit) => {
    return Promise.resolve([]);
});

const getUserMock = jest.fn();
const updateUserMock = jest.fn();
const deleteMock = jest.fn();
const createMock = jest.fn();

class serviceMock {
    getAutoSuggest = getAutoSuggestMock;
    getUser = getUserMock;
    updateUser = updateUserMock;
    deleteUser = deleteMock;
    createUser = createMock;
}

const controller = new userController(new serviceMock() as unknown as IUserService);

const jsonMock = jest.fn();
const statusMock = jest.fn()
const sendMock = jest.fn();
const endMock = jest.fn();
const res = {
    json: jsonMock,
    status: statusMock,
    send: sendMock,
    end: endMock,
}

describe('getAutoSuggestUsers', () => {
    beforeEach(() => jest.clearAllMocks());

    it('Должен записать в ответ результат, возвращенный сервисом', async () => {
        const req = {
            query: {
                loginSubstring: 'log',
                limit: 1
            }
        };

        await controller.getAutoSuggestUsers(req as unknown as Request, res as unknown as Response);
        expect(getAutoSuggestMock).toHaveBeenLastCalledWith('log', 1);
        expect(jsonMock).toHaveBeenLastCalledWith([]);
    });

    it('Должен присвоить лимиту значение 0, если оно отсутствует', async () => {
        const reqWithIncorrectLimit = {
            query: {
                loginSubstring: 'log',
            }
        }
        await controller.getAutoSuggestUsers(reqWithIncorrectLimit as unknown as Request, res as unknown as Response);
        expect(getAutoSuggestMock).toHaveBeenLastCalledWith('log', 0);
    })
});

describe('getUser', () => {
    beforeEach(() => jest.clearAllMocks());

    const req = {
        params: {
            id: '1'
        }
    }

    it('Должен записать в ответ результат, возвращенный сервисом, если результат корректен', async () => {
        getUserMock.mockImplementation(async() => Promise.resolve({}));

        await controller.getUser(req as unknown as Request, res as unknown as Response);

        expect(getUserMock).toHaveBeenCalledWith('1');
        expect(jsonMock).toHaveBeenCalledWith({});
    });

    it('Должен установить статус 404, если пользователь не найден', async () => {
        getUserMock.mockImplementation(async() => Promise.resolve(undefined));

        await controller.getUser(req as unknown as Request, res as unknown as Response);

        expect(getUserMock).toHaveBeenCalledWith('1');
        expect(statusMock).toHaveBeenCalledWith(404);
    })
});

describe('updateUser', () => {
    const req = {
        params: {
            id: '1',
        },
        body: {
            "login": "log",
        }
    }
    it('Должен записать в ответ результат, возвращенный сервисом', async () => {
        updateUserMock.mockImplementation(async() => Promise.resolve({}));

        await controller.updateUser(req as unknown as Request, res as unknown as Response);

        expect(updateUserMock).toHaveBeenCalledWith({
            "login": "log",
            "id": '1'
        });
        expect(sendMock).toHaveBeenCalledWith({});
    });
});

describe('deleteUser', () => {
    const req = {
        params: {
            id: '1',
        }
    }
    it('Должен записывать в результат идентификатор пользователя', async () => {
        deleteMock.mockImplementation(() => Promise.resolve('id'));

        await controller.deleteUser(req as unknown as Request, res as unknown as Response);

        expect(deleteMock).toHaveBeenCalledWith('1');
        expect(sendMock).toHaveBeenCalledWith('1');
    });
});

describe('addUser', () => {
    const req = {
        body: {
            id: '1',
        }
    }
    it('Должен записывать в результат идентификатор пользователя и устанавливать статус 201', async () => {
        createMock.mockImplementation(() => Promise.resolve('id'));

        await controller.addUser(req as unknown as Request, res as unknown as Response);

        expect(createMock).toHaveBeenCalledWith(req.body);
        expect(sendMock).toHaveBeenCalledWith('id');
        expect(statusMock).toHaveBeenCalledWith(201);
        expect(endMock).toHaveBeenCalledTimes(1);
    });
});