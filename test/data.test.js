const { preProcessor, data } = require('./../src/data');

const User = require('./../src/models/User');
const Ticket = require('./../src/models/Ticket');
const Organisation = require('./../src/models/Organisation');

jest.mock('fs');

beforeAll(() => {
    preProcessor.mutate();
});


describe('Test the pre processed data', () => {
    test('User relations test', () => {
        let [, indexedUsers] = data.getUsers();
        expect(indexedUsers._id[1][0]).toBeInstanceOf(User);
        expect(indexedUsers._id[1][0].organisation.name).toBe('Organistaion 1');
        expect(indexedUsers._id[1][0].submittedTickets).toHaveLength(2);
        expect(indexedUsers._id[1][0].assignedTickets).toHaveLength(3);
        expect(indexedUsers._id[2][0].assignedTickets).toHaveLength(1);
        expect(indexedUsers._id[2][0].assignedTickets[0].subject).toBe('A Catastrophe in Korea (North)');
    });

    test('Ticket relations test', () => {
        let [, indexedTickets] = data.getTickets();
        expect(indexedTickets._id['4cce7415-ef12-42b6-b7b5-fb00e24f9cc1'][0]).toBeInstanceOf(Ticket);
        expect(indexedTickets._id['4cce7415-ef12-42b6-b7b5-fb00e24f9cc1'][0].organisation.name).toBe('Organistaion 3');
        expect(indexedTickets._id['4cce7415-ef12-42b6-b7b5-fb00e24f9cc1'][0].submitter.name).toBe('Jenny Doe');
        expect(indexedTickets._id['4cce7415-ef12-42b6-b7b5-fb00e24f9cc1'][0].assignee.name).toBe('John Doe');
    });

    test('Organisation relations test', () => {
        let [, indexedOrganisation] = data.getOrganisations();
        expect(indexedOrganisation._id[3][0]).toBeInstanceOf(Organisation);
        expect(indexedOrganisation._id[3][0].users).toHaveLength(2);
        expect(indexedOrganisation._id[1][0].tickets).toHaveLength(2);
        expect(indexedOrganisation._id[2][0].tickets).toHaveLength(1);
    });
});