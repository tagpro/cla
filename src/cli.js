// Map the commands to the logic/view
const program = require('commander');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const { getInputType, search, display } = require('./logic');
const { log, CONSTANTS, normalize } = require('./utils');
const { data } = require('./data');

class cli {
    constructor() {
        program
            .version('1.0.0')
            .description('This tool will help you find user tickets.');

        // TODO: Add help options
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
            log.error('Error while creating the selection prompt', error);
        }
    }

    createEntity(entityChoice) {
        let { USERS, TICKETS, ORGANISATIONS } = CONSTANTS.ENTITIES, Entity;
        try {
            let { Organisation, User, Ticket } = data.getEntities();
            switch (entityChoice) {
                case USERS: {
                    Entity = User;
                    break;
                }
                case TICKETS: {
                    Entity = Ticket;
                    break;
                }
                case ORGANISATIONS: {
                    Entity = Organisation;
                    break;
                }
            }
        } catch (error) {
            log.error('Error while fetching option fields', error);
        }
        return Entity;
    }

    async getSearchCriteria(entityChoice) {
        let Entity = this.createEntity(entityChoice), choices;
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
            let value = await prompt([{...inputOptions}]);
            if (!value.searchValue) {
                value = null;
            } else {
                value = normalize(value.searchValue, fieldType);
            }
            // Get search result from logic
            // Print onto console from logic/cli
            let result = search(entityChoice, choice.fieldChoice, value);
            display.log(result, entityChoice);
        } catch (error) {
            log.error('Some error occured while generating search options', error);
        }
    }
}

module.exports = {
    commandInterace: cli
};