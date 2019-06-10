#! /usr/bin/env node

// import libraries
const { commandInterace } = require("./cli");
const { prompt } = require('inquirer');
const { log } = require('./utils');
const { preProcessor, data } = require('./data');

const { User, Ticket, Organisation } = data.getEntities();
// Bootstrapping goes here
log.message('Setting up your CLI application');
// Set up the data
preProcessor.mutate();
// Set up cli
let cli = new commandInterace();

let printKeys = function () {
    const Entities = [User, Ticket, Organisation];
    for (const Entity of Entities) {
        log.simple(`––––––––––––––– ${Entity.name} –––––––––––––––`);
        let fields = Entity.getFields();
        for (let i in fields) {
            const field = fields[i];
            log.simple(`${Number(i) + 1} ${field}`);
        }
    }
};

/**
 * This is where the main loop exists.
 * The application will be running until the user decides to quit.
 */
async function run() {
    let stay = true;
    let choices = ['Start New Search', 'Print Help', 'Clear Screen', 'List all the keys available to search', 'Quit'];
    let search = false;
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
            search = false;
            switch (answer.confirmationExit) {
                case choices[0]:
                    search = true;
                    break;
                case choices[1]:
                    cli.help();
                    break;
                case choices[2]:
                    log.clear();
                    break;
                case choices[3]:
                    printKeys();
                    break;
                case choices[4]:
                    stay = false;
            }
        } catch (error) {
            log.error('Failed while taking your input. Please try again', error);
        }
    }
}

run();