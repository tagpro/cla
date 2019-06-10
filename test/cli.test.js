const { preProcessor } = require('./../src/data');
const { CONSTANTS: { ENTITIES } } = require('./../src/utils');
const inquirer = require('inquirer');
const { commandInterace } = require('./../src/cli');

const PROMPT = {
    ENTITY_SELECTION: 'entitySelection',
    FIELD_CHOICE: 'fieldChoice',
    SEARCH_VALUE: 'searchValue',
};

const cli = new commandInterace();
jest.mock('fs');
jest.mock('inquirer');

beforeAll(() => {
    preProcessor.mutate();
});

// We will setup inquirer at the beginning of every test to mock user inputs
describe('Test cli functions', () => {
    test('should get type of search', async () => {
        // Setting up inquirer
        // Operator selects Organisation
        let input1 = { [PROMPT.ENTITY_SELECTION]: ENTITIES.ORGANISATIONS };
        // Operator selects User
        let input2 = { [PROMPT.ENTITY_SELECTION]: ENTITIES.USERS };
        inquirer.prompt.mockReturnValueOnce(input1).mockReturnValueOnce(input2);


        // Test to input Organisation as search option
        let result = await cli.getSearch();
        expect(result).toBe(ENTITIES.ORGANISATIONS);
        // Test to input Users as search option
        result = await cli.getSearch();
        expect(result).toBe(ENTITIES.USERS);
    });

    test('should return query for organisation search', async () => {
        // Set up inquirer
        // First search for organisation
        let key = '_id', value = 3;
        let choiceInput = { [PROMPT.FIELD_CHOICE]: key };
        let valInput = { [PROMPT.SEARCH_VALUE]: value };
        inquirer.prompt.mockReturnValueOnce(choiceInput);
        inquirer.prompt.mockReturnValueOnce(valInput);

        // Test for Organisation as search option
        let result = await cli.initiateSearch(ENTITIES.ORGANISATIONS);
        expect(result).toStrictEqual([ENTITIES.ORGANISATIONS, '_id', 3]);
    });

    test('should return query for user search', async () => {
        // Set up inquirer
        // Second search for ticket
        let key = 'subject',
            value = 'A subject to be looked at',
            choiceInput = { [PROMPT.FIELD_CHOICE]: key },
            valInput = { [PROMPT.SEARCH_VALUE]: value };
        inquirer.prompt.mockReturnValueOnce(choiceInput);
        inquirer.prompt.mockReturnValueOnce(valInput);

        // Test for User as search option
        let result = await cli.initiateSearch(ENTITIES.USERS);
        expect(result).toStrictEqual([ENTITIES.USERS, key, value]);
    });

    test('should return query for ticket search', async () => {
        // Set up inquirer
        // Third search for User
        let key = 'active',
            value = true,
            choiceInput = { [PROMPT.FIELD_CHOICE]: key },
            valInput = { [PROMPT.SEARCH_VALUE]: value };
        inquirer.prompt.mockReturnValueOnce(choiceInput);
        inquirer.prompt.mockReturnValueOnce(valInput);

        // Test for Ticket as search option
        let result = await cli.initiateSearch(ENTITIES.TICKETS);
        expect(result).toStrictEqual([ENTITIES.TICKETS, 'active', true]);
    });
});
