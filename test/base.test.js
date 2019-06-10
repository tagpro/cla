const { preProcessor, data } = require('./../src/data');

jest.mock('fs');

beforeAll(() => {
    preProcessor.mutate();
});

test('should fetch users', () => {
    const processedUsers = data.getUsers(true);
    expect(processedUsers.length).toBe(4);

});

// Add mutation logic to run before tests.
