const { commandInterace } = require("./cli");
var inquirer = require('inquirer');
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
    let stay = true

    while (stay) {
        try {

            let answers = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirmationExit',
                    message: 'Do you want to continue?'
                }
            ]);
            if (!answers.confirmationExit) {
                stay = false
            }
        } catch (error) {
            log.error('Failed Somewhere. Please try again!', error);
        }
    }
}

run();