#! /usr/bin/env node

var fs = require("fs");
const chalk = require('chalk');
const { log, CONSTANTS } = require('./utils');

// Import models
const User = require('./models/User');
const Ticket = require('./models/Ticket');
const Organisation = require('./models/Organisation');
// Setup all models
let users = [], organisations = [], tickets = [];
try {
    users = JSON.parse(fs.readFileSync('./data/users.json'));
    organisations = JSON.parse(fs.readFileSync('./data/organizations.json'));
    tickets = JSON.parse(fs.readFileSync('./data/tickets.json'));
} catch (error) {
    // TODO: Update logging to use this
    log.simple(chalk.red('Error occured while loading data'), error);
}

// Define relationships?

module.exports = {
    users,
    organisations,
    tickets,
    Entities: {
        User,
        Ticket,
        Organisation,
    },
}