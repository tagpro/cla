// TODO: use data.js instead
const chalk = require('chalk');
let { users, tickets, organisations } = require('./models');
const { CONSTANTS } = require('./utils');

const { ARRAY, BOOLEAN, STRING, NUMBER } = CONSTANTS.TYPES;
let getInputType = function (choiceType, entity) {
    let options = {
        type: 'input'
    }
    switch(choiceType) {
        case NUMBER: {
            options.type = 'number';
            break;
        }
        case BOOLEAN: {
            options.type = 'confirm';
            options.default = true;
            break;
        }
    }
    return options;
}

module.exports = {
    dummy: function () {
        console.log(`Users: ${chalk.cyan(users.length)}`);
        console.log(`Tickets: ${chalk.cyan(tickets.length)}`);
        console.log(`Organisations: ${chalk.cyan(organisations.length)}`);
    },
    getInputType,
};