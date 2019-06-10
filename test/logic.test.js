const { getEntity, getInputType, search } = require('./../src/logic');
const { preProcessor } = require('./../src/data');
const User = require('./../src/models/User');
const Ticket = require('./../src/models/Ticket');
const Organisation = require('./../src/models/Organisation');
const { CONSTANTS: { TYPES: { ARRAY, BOOLEAN, NUMBER, STRING } } } = require('./../src/utils');

jest.mock('fs');

beforeAll(() => {
    preProcessor.mutate();
});

describe('Test logic functions in Views', () => {
    test('should retrieve entity for computation', () => {
        let Entity = getEntity('tickets');
        expect(Entity).toBe(Ticket);
        Entity = getEntity('users');
        expect(Entity).toBe(User);
        Entity = getEntity('organisations');
        expect(Entity).toBe(Organisation);
    });

    test('should get input type for console input', () => {
        expect(getInputType(NUMBER).type).toBe('number');
        expect(getInputType(BOOLEAN).type).toBe('confirm');
        expect(getInputType(ARRAY).type).toBe('input');
        expect(getInputType(STRING).type).toBe('input');
    });

    test('should search users for the parameters provided', () => {

    });


    test('should search tickets for the parameters provided', () => {

    });


    test('should search organisations for the parameters provided', () => {

    });
});
