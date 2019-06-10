// Map the commands to the logic/view
const program = require('commander');
const { prompt } = require('inquirer');
const { getInputType, search, display, getEntity } = require('./logic');
const { log, CONSTANTS, normalize } = require('./utils');
const chalk = require('chalk');

class cli {
    constructor() {
        program
            .version('1.0.0')
            .description('This tool will help you find user tickets.');

        // TODO: Add help text
        // Yes/No is Y/n. yes is the default answer
        this.program = program;
        log.clear();
        this.help();
    }

    help() {
        log.message('Welcome to Zendesk Command Line Search Application');
        log.simple('––––––––––––––––––––––––––––––––––––––––––––––––––');
        log.message('Searching is a three step process');
        log.simple('===');
        log.simple(`1. ${chalk.bgYellow(chalk.black('Select the type of data'))} you would like to search. It can be User, Organistaion or Ticket.`);
        log.simple(`2. ${chalk.bgYellow(chalk.black('Select the type of field'))} from the list given`);
        log.simple(`3. ${chalk.bgYellow(chalk.black('Enter the value'))} of the field selected in step 2`);
        log.simple();
        log.simple('After every search, you can print this help again, ' +
            'start new search, clear your screen or quit this search tool');
        log.simple();
        log.simple('Hint: You can use arrow keys to navigate');
        log.simple();
        log.simple('Hit Ctrl + C to quit anytime');
        log.simple();
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