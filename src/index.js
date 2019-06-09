const { commandInterace } = require("./cli");
const { prompt } = require('inquirer');
const { log } = require('./utils');
// Bootstrapping goes here
// import libraries

// Set up the data

// Set up cli
let cli = new commandInterace();


/**
 * This is where the main loop exists.
 * The application will be running until the user decides to quit.
 */
async function run() {
    let stay = true;

    while (stay) {
        try {
            let entity = await cli.getSearch();
            await cli.getSearchCriteria(entity);
            let answer = await prompt([
                {
                    type: 'confirm',
                    name: 'confirmationExit',
                    message: 'Do you want to continue?'
                }
            ]);
            if (!answer.confirmationExit) {
                stay = false;
            }
        } catch (error) {
            log.error('Failed while taking your input. Please try again', error);
        }
    }
}

run();