// TODO: use data.js instead
const chalk = require('chalk');
let { users, tickets, organisations } = require('./models');
const { CONSTANTS } = require('./utils');
let { data } = require('./data');

const { ARRAY, BOOLEAN, STRING, NUMBER } = CONSTANTS.TYPES;
let getInputType = function (choiceType, entity) {
    let options = {
        type: 'input'
    }
    switch (choiceType) {
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

// Linear secondary search

let simpleSearch = function (entity, field, value) {
    let result = [], entities;
    const { USERS, TICKETS, ORGANISATIONS } = CONSTANTS.ENTITIES;

    switch (entity) {
        case USERS:
            entities = data.getUsers(true);
            break;
        case TICKETS:
            entities = data.getTickets(true);
            break;
        case ORGANISATIONS:
            entities = data.getOrganisations(true);
            break;
    }

    try {
        result = entities.filter((e) => {
            if (e.hasOwnProperty(field) && e[field] == value) {
                return true
            }
            return false;
        });
    } catch (error) {
        log.error('Error while performing simple search for' +
            `${field} with value ${value} under ${entity}`, error);
        // return [];
    }
    return result;

}

// Advanced key based search (primary search - use map from data.js)
let testAdvancedSearch = function (entity, field) {
    const { USERS, TICKETS, ORGANISATIONS } = CONSTANTS.ENTITIES;
    // Don't abstract this swtich case at data layer as this is a logical requirement
    let entities, optimisedEntities;
    try {
        switch (entity) {
            case USERS:
                [entities, optimisedEntities] = data.getUsers();
                break;
            case TICKETS:
                [entities, optimisedEntities] = data.getTickets();
                break;
            case ORGANISATIONS:
                [entities, optimisedEntities] = data.getOrganisations();
                break;
        }
    } catch (error) {
        log.error('Unexpected Error Occured while searching. Falling back to basic search technique . . .', error)
        // Not a big issue, we can still search using basic search
        return false;
    }

    if (optimisedEntities.hasOwnProperty === field) {
        return true;
    }

    return false;
}

let advancedSearch = function () {

}

// Prepare search
let search = function (entity, field, value) {
    // Find out if we can search the field on an entity using advanced mode
    let isSearchable = testAdvancedSearch(entity, field);
    let result = [];

    // Do advanced search if possible
    if (isSearchable) {
        result = advancedSearch(entity, field, value);
    }
    // Fall back to basic search if need be
    else {
        result = simpleSearch(entity, field, value)
    }
    // Get associated data

    // Return the resulting array
    return result;
}

module.exports = {
    dummy: function () {
        console.log(`Users: ${chalk.cyan(users.length)}`);
        console.log(`Tickets: ${chalk.cyan(tickets.length)}`);
        console.log(`Organisations: ${chalk.cyan(organisations.length)}`);
    },
    getInputType,
    search,
};