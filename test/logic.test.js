const { getEntity, getInputType, search } = require('./../src/logic');
const { preProcessor } = require('./../src/data');
const User = require('./../src/models/User');
const Ticket = require('./../src/models/Ticket');
const Organisation = require('./../src/models/Organisation');
const { CONSTANTS } = require('./../src/utils');

const { TYPES: { ARRAY, BOOLEAN, NUMBER, STRING } } = CONSTANTS;
const { ENTITIES: { USERS, ORGANISATIONS, TICKETS } } = CONSTANTS;

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

        // Test negative case
        Entity = getEntity('newEntity');
        expect(Entity).toBe(undefined);
    });

    test('should get input type for console input', () => {
        expect(getInputType(NUMBER).type).toBe('number');
        expect(getInputType(BOOLEAN).type).toBe('confirm');
        expect(getInputType(ARRAY).type).toBe('input');
        expect(getInputType(STRING).type).toBe('input');

        // Should allow to input something if the type is not found
        expect(getInputType('NEW TYPE').type).toBe('input');
    });
});

describe('Test to search for a query', () => {

    test('should search users for the parameters provided', () => {
        let users = search(USERS, '_id', 1);
        expect(users).toHaveLength(1);
        expect(users[0].name).toBe('John Doe');
        expect(users[0]).toBeInstanceOf(User);

        // Search over an array property
        users = search(USERS, 'tags', 'Glenshaw');
        expect(users).toHaveLength(1);
        expect(users[0].name).toBe('Michael Jordan');

        // Search over an unindexed property
        users = search(USERS, 'email', 'paul@domain.com');
        expect(users).toHaveLength(1);
        expect(users[0].name).toBe('Paul McCartney');

        // Search over an boolean property
        users = search(USERS, 'active', true);
        expect(users).toHaveLength(3);
        expect(users[0].name).not.toBe('Jenny Doe');
        expect(users[1].name).not.toBe('Jenny Doe');
        expect(users[2].name).not.toBe('Jenny Doe');

        // Non existent search
        users = search(USERS, '_id', 6);
        expect(users).toHaveLength(0);

        // Test for empty values
        users = search(USERS, 'email', null);
        expect(users).toHaveLength(1);
        expect(users[0].name).toBe('Jenny Doe');
    });


    test('should search tickets for the parameters provided', () => {
        let tickets = search(TICKETS, '_id', '436bf9b0-1147-4c0a-8439-6f79833bff5b');
        expect(tickets).toHaveLength(1);
        expect(tickets[0].subject).toBe('A Catastrophe in Korea (North)');
        expect(tickets[0]).toBeInstanceOf(Ticket);

        // Search over an array property
        tickets = search(TICKETS, 'tags', 'New York');
        expect(tickets).toHaveLength(1);
        expect(tickets[0].subject).toBe('A Catastrophe in Hungary');

        // Search over an unindexed property
        tickets = search(TICKETS, 'due_at', '2016-08-19T07:40:17 -10:00');
        expect(tickets).toHaveLength(1);
        expect(tickets[0].subject).toBe('A Problem in Morocco');

        // Search over an boolean property
        tickets = search(TICKETS, 'type', 'problem');
        expect(tickets).toHaveLength(2);
        expect(tickets[0].subject).not.toBe('A Nuisance in Ghana');
        expect(tickets[0].subject).not.toBe('A Catastrophe in Micronesia');
        expect(tickets[0].subject).not.toBe('A Catastrophe in Korea (North)');

        expect(tickets[1].subject).not.toBe('A Nuisance in Ghana');
        expect(tickets[1].subject).not.toBe('A Catastrophe in Micronesia');
        expect(tickets[1].subject).not.toBe('A Catastrophe in Korea (North)');

        // Non existent search
        tickets = search(TICKETS, '_id', 6);
        expect(tickets).toHaveLength(0);

        // Test for empty values
        tickets = search(TICKETS, 'description', null);
        expect(tickets).toHaveLength(1);
        expect(tickets[0].subject).toBe('A Nuisance in Ghana');
    });


    test('should search organisations for the parameters provided', () => {
        // Basic search
        let organisations = search(ORGANISATIONS, '_id', 1);
        expect(organisations).toHaveLength(1);
        expect(organisations[0].name).toBe('Organistaion 1');
        expect(organisations[0]).toBeInstanceOf(Organisation);

        // Non existent search
        organisations = search(ORGANISATIONS, '_id', 4);
        expect(organisations).toHaveLength(0);

        // Test for empty values
        organisations = search(ORGANISATIONS, 'details', '');
        expect(organisations).toHaveLength(1);
        expect(organisations[0].name).toBe('Organistaion 3');

        // Search over an array property
        organisations = search(ORGANISATIONS, 'tags', 'tag2');
        expect(organisations).toHaveLength(2);
        expect(organisations[0].name).not.toBe('Organistaion 3');
        expect(organisations[1].name).not.toBe('Organistaion 3');

        // Search over an unindexed property
        organisations = search(ORGANISATIONS, 'details', 'Mega Org 2');
        expect(organisations).toHaveLength(1);
        expect(organisations[0].name).toBe('Organistaion 2');

        // Search over an boolean property
        organisations = search(ORGANISATIONS, 'shared_tickets', true);
        expect(organisations).toHaveLength(2);
        expect(organisations[0].name).not.toBe('Organistaion 1');
        expect(organisations[1].name).not.toBe('Organistaion 1');
    });

    test('should return nothing for a wrong query', () => {
        let results = search('NO_ENTITY', '_id', 1);
        expect(results).toHaveLength(0);
        expect(results).toBeInstanceOf(Array);
    });
});