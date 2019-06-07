// Map the commands to the logic/view
const program = require('commander');

const { prompt } = require('inquirer');

const { dummy } = require('./logic');

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
        console.log('Setting up cli . . . complete');
    }

    programSetup() {
        // Set up all the queries here
    }

}

module.exports = {
    commandInterace: cli
}