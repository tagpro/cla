// Map the commands to the logic/view
const program = require('commander');
const { prompt } = require('inquirer');
const { getInputType, search, display, getEntity } = require('./logic');
const { log, CONSTANTS, normalize } = require('./utils');

class cli {
    constructor() {
        program
            .version('1.0.0')
            .description('This tool will help you find user tickets.');

        // TODO: Add help text
        // Yes/No is Y/n. yes is the default answer
        this.program = program;
        log.success('Setting up cli . . . complete');
    }
    static entitySelection() {
        let { USERS, TICKETS, ORGANISATIONS } = CONSTANTS.ENTITIES;
        return [USERS, TICKETS, ORGANISATIONS];
    }
    async getSearch() {
        // Set up all the queries here
        try {
            let choices = cli.entitySelection();
            let selection = await prompt([
                {
                    type: 'list',
                    name: 'entitySelection',
                    choices,
                    message: 'Select an entity to search'
                }
            ]);
            return selection.entitySelection;
        } catch (error) {
            log.error('Error while selecting search', error);
        }
    }

    async initiateSearch(entityChoice) {
        let Entity = getEntity(entityChoice), choices;
        choices = Entity.getFields();

        // Handling promise errors
        try {
            const choice = await prompt([
                {
                    type: 'list',
                    name: 'fieldChoice',
                    choices: choices,
                    message: 'Select a field to search',
                },
            ]);
            const fieldType = Entity.getFieldType(choice.fieldChoice);
            let inputOptions = getInputType(fieldType);
            inputOptions = {
                message: `Please enter value for ${choice.fieldChoice}`,
                name: 'searchValue',
                ...inputOptions
            };
            let value = await prompt([{ ...inputOptions }]);
            if (!value.searchValue) {
                value = null;
            } else {
                value = normalize(value.searchValue, fieldType);
            }
            return [entityChoice, choice.fieldChoice, value];
        } catch (error) {
            log.error('Some error occured while generating search options', error);
        }
    }

    generateResults(entityChoice, choice, value) {
        try {
            // Get search result from logic
            let result = search(entityChoice, choice, value);
            // Print onto console from logic/cli
            display.log(result, entityChoice);
        } catch (error) {
            log.error('An error occured while looking for your query.', error);
        }
    }
}

module.exports = {
    commandInterace: cli
};