import {User} from "./types";
import {Repository} from "./repository";

describe('Repository', () => {
    let repository: Repository;

    beforeEach( () => {
       repository = new Repository();
    });

    it('should add user to repository', async () => {
        const user = {
            login: 'login',
            password: 'password',
            isDeleted: false,
            age: 20,
        };

        repository.users = [];
        const id = await repository.createUser(user);

        expect(id).toBeTruthy();
        expect(repository.users).toEqual([{
            ...repository.users[0],
            ...user
        }]);
        expect(repository.users[0].id).toBeTruthy();
    });
});