// TODO: use data.js instead
const chalk = require('chalk');
let { users, tickets, organisations } = require('./models');

module.exports = {
    dummy: function () {
        console.log(`Users: ${chalk.cyan(users.length)}`);
        console.log(`Tickets: ${chalk.cyan(tickets.length)}`);
        console.log(`Organisations: ${chalk.cyan(organisations.length)}`);
    }
};