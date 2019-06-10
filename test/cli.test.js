const { preProcessor } = require('./../src/data');
const { isEmpty, normalize } = require('./../src/utils');

const { commandInterace } = require('./../src/cli');

const cli = new commandInterace();

jest.mock('fs');

beforeAll(() => {
    preProcessor.mutate();
});


test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});