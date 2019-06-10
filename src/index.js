#! /usr/bin/env node

// import libraries
const { commandInterace } = require("./cli");
const { prompt } = require('inquirer');
const { log } = require('./utils');
const { preProcessor } = require('./data');

// Bootstrapping goes here
log.message('Setting up your CLI application');
// Set up the data
preProcessor.mutate();
// Set up cli
let cli = new commandInterace();

/**
 * This is where the main loop exists.
 * The application will be running until the user decides to quit.
 */
async function run() {
    let stay = true;
    let choices = ['Start New Search', 'Print Help', 'Clear Screen', 'Quit'];
    let search = true;
    let answer, entity, query;

    while (stay) {
        try {
            if (search) {

                entity = await cli.getSearch();
                query = await cli.initiateSearch(entity);
                cli.generateResults(...query);
            }
            answer = await prompt([
                {
                    type: 'rawlist',
                    choices,
                    name: 'confirmationExit',
                    message: 'Your next course of action'
                }
            ]);
            search = true;
            switch (answer.confirmationExit) {
                case choices[0]:
                    break;
                case choices[1]:
                    search = false;
                    cli.help();
                    break;
                case choices[2]:
                    search = false;
                    log.clear();
                    break;
                case choices[3]:
                    stay = false;
            }
        } catch (error) {
            log.error('Failed while taking your input. Please try again', error);
        }
    }
}

run();