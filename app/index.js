const { commandInterace } = require("./cli");
var inquirer = require('inquirer');

// Bootstrapping goes here
// import libraries

// Set up the data

// Set up cli
let cli = new commandInterace();


async function run() {
    let stay = true

    while(stay) {
        let answers = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirmationExit',
                message: 'Do you want to continue?'
            }
        ]);
        if (answers.confirmationExit) {
            stay = false
        }
    }
}

run();