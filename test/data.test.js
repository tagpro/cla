const { preProcessor, data } = require('./../src/data');

jest.mock('fs');

beforeAll(() => {
    preProcessor.mutate();
});


describe('Test the pre processed data', () => {
    test('User relations test', () => {
        let [users, indexedUsers] = data.getUsers();
        expect(indexedUsers._id[1][0].organisation.name).toBe('Organistaion 1');
    });

    test('Ticket relations test', () => {

    });

    test('Organisation relations test', () => {

    });
});