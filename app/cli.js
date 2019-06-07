// Map the commands to the logic/view
const program = require('commander');
const { prompt } = require('inquirer');

const { dummy } = require('./logic');
const { log, CONSTANTS } = require('./utils');
const { data } = require('./data');

dummy();


class cli {
    constructor() {
        program
            .version('1.0.0')
            .description('This tool will help you find user tickets.');

        if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
            program.outputHelp();
            process.exit();
        }
        program.parse(process.argv)
        this.program = program;
        log.message('Setting up cli . . . complete');
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
                    message: 'Select the entity to search on'
                }
            ]);
            return selection.entitySelection;
        } catch (error) {
            log.error('Error while creating the selection prompt', error);
        }
    }

    async getSearchCriteria(entityChoice) {
        let { USERS, TICKETS, ORGANISATIONS } = CONSTANTS.ENTITIES;
        try {
            switch (entityChoice) {
                case USERS: {
                    let { User } = data.getEntities();
                    const choice = await prompt([
                        {
                            type: 'list',
                            name: 'userFieldChoice',
                            choices: User.getFields(),
                            message: 'Select the field to search on'
                        }
                    ]);
                    log.message(`You chose the field - ${choice.userFieldChoice}`);
                }
                case TICKETS: {

                }
                case ORGANISATIONS: {

                }
            }
        } catch (error) {
            log.error('Some error occured while generating search options', error);
        }
    }
}

module.exports = {
    commandInterace: cli
}