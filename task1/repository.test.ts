import {User} from "./types";
import {Repository} from "./repository";

describe('Repository', () => {
    let repository: Repository;

    const user1 = {
        id: '1',
        login: 'login',
        password: 'password',
        isDeleted: false,
        age: 20,
    };

    const user2 = {
        id: '2',
        login: 'login2',
        password: 'password2',
        isDeleted: false,
        age: 21,
    };

    const user3 = {
        id: '3',
        login: 'login3',
        password: 'password3',
        isDeleted: true,
        age: 28,
    };

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

    it('should delete users from array', async () => {
        repository.users = [user1, user2, user3];

        const result1 = await repository.deleteUser(user2);
        const result2 = await repository.deleteUser(user3);

        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(repository.users).toEqual([
            user1,
            {
                ...user2,
                isDeleted: true,
            },
            user3
        ]);
    });

    it('should return true if element is not exists', async () => {
        repository.users = [user1, user2];

        const result = await repository.deleteUser(user3);

        expect(result).toBe(true);
    });

    it('should return user if it exists', async () => {
        repository.users = [user1, user2];

        const result = await repository.getUser('2');

        expect(result).toEqual(user2);
    });

    it('should return undefined if it exists', async () => {
        repository.users = [user1, user2];

        const result = await repository.getUser('8');

        expect(result).toBeUndefined();
    });

    it('should update user if it exists', async () => {
       repository.users = [user1, user2];
       const newUser2 = {
           ...user2,
           age: 89
       }

       const result = await repository.updateUser(newUser2);

       expect(result).toEqual(newUser2);
       expect(repository.users).toEqual([user1, newUser2]);
    });

    it('should return user and not update list if user does not exists', async () => {
        repository.users = [user1, user2];

        const result = await repository.updateUser(user3);

        expect(result).toEqual(user3);
        expect(repository.users).toEqual([user1, user2]);
    });

    it('should return empty list of autosuggested users if limit equals 0', async () =>{
        repository.users = [user1, user2, user3];

        const result = await repository.getAutoSuggestUsers('log', 0);

        expect(result).toEqual([]);
    });

    it('should return empty list of autosuggested users if there are not similar logins', async () =>{
        repository.users = [user1, user2, user3];

        const result = await repository.getAutoSuggestUsers('abc', 3);

        expect(result).toEqual([]);
    });

    it('should return list of autosuggested users with right length if there are similar logins', async () =>{
        repository.users = [user1, user2, user3];

        const result = await repository.getAutoSuggestUsers('log', 2);

        expect(result).toEqual([user1, user2]);
    });
});