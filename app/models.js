#! /usr/bin/env node

var fs = require("fs");
const chalk = require('chalk');

// Setup all models
let users = [], organisations = [], tickets = []
try {
    users = JSON.parse(fs.readFileSync('./data/users.json'));
    organisations = JSON.parse(fs.readFileSync('./data/organizations.json'));
    tickets = JSON.parse(fs.readFileSync('./data/tickets.json'));
} catch (error) {
    console.log(chalk.red('Error occured while loading data'), error);
}

// Define relationships?


module.exports = {
    users,
    organisations,
    tickets,
}