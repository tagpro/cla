const { CONSTANTS, log } = require('./utils');
let { data } = require('./data');
const chalk = require('chalk');

const { BOOLEAN, NUMBER, ARRAY } = CONSTANTS.TYPES;
const { User, Organisation, Ticket } = data.getEntities();
class Display {
    constructor() {
        this.tabWidth = 15;
    }

    /**
     * Print key and value in tabular fashion
     *
     * @param {string} key Key to print
     * @param {string} val Value for the key
     */

    log(results) {
        try {
            if (results.length == 0) {
                log.message('No results found');
            } else {
                log.success(`Found ${results.length} result${results.length > 1? 's': ''}`);
            }
            console.log();
            for (let i in results) {
                let res = results[i];
                log.simple(chalk.bgMagenta(`--- ${Number(i) + 1} ---`));
                res.log();
            }
        } catch (error) {
            log.error('Error occured while printing the details', error);
        }
    }
}

let display = new Display();

let getInputType = function (choiceType) {
    let options = {
        type: 'input'
    };
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
};

// Linear secondary search

let simpleSearch = function (entity, field, value) {
    let results = [], entities, Entity;
    const { USERS, TICKETS, ORGANISATIONS } = CONSTANTS.ENTITIES;

    switch (entity) {
        case USERS:
            entities = data.getUsers(true);
            Entity = User;
            break;
        case TICKETS:
            entities = data.getTickets(true);
            Entity = Ticket;
            break;
        case ORGANISATIONS:
            entities = data.getOrganisations(true);
            Entity = Organisation;
            break;
    }

    try {
        results = entities.filter((e) => {
            let type = Entity.getFieldType(field);
            // Match null criteria
            if (value == null && (e[field] == '' || e[field] == null || e[field] == undefined || e[field] == [])) {
                return true;
            }
            if (e.hasOwnProperty(field)) {
                if (type == ARRAY && e[field].indexOf(value) > 0) {
                    return true;
                } else if (e[field] == value) {
                    return true;
                }
            }
            return false;
        });
    } catch (error) {
        log.error('Error while performing simple search for' +
            `${field} with value ${value} under ${entity}`, error);
        // return [];
    }
    return results;

};

// Advanced key based search (primary search - use map from data.js)
let testAdvancedSearch = function (entity, field, value) {
    const { USERS, TICKETS, ORGANISATIONS } = CONSTANTS.ENTITIES;
    // Don't abstract this swtich case at data layer as this is a logical requirement
    let optimisedEntities;
    try {
        switch (entity) {
            case USERS:
                [, optimisedEntities] = data.getUsers();
                break;
            case TICKETS:
                [, optimisedEntities] = data.getTickets();
                break;
            case ORGANISATIONS:
                [, optimisedEntities] = data.getOrganisations();
                break;
        }
    } catch (error) {
        log.error('Unexpected Error Occured while searching. Falling back to basic search technique . . .', error);
        // Not a big issue, we can still search using basic search
        return false;
    }
    if (optimisedEntities.hasOwnProperty(field)) {
        let val = optimisedEntities[field][value];
        return val == undefined ? [] : val;
    }
    return false;
};

let advancedSearch = function () {

};

// Prepare search
let search = function (entity, field, value) {
    // Find out if we can search the field on an entity using advanced mode
    let isSearchable = testAdvancedSearch(entity, field, value);
    let result = [];

    // Do advanced search if possible
    if (isSearchable) {
        result = isSearchable;
    }
    // Fall back to basic search if need be
    else {
        log.message('Fetching search results . . .');
        result = simpleSearch(entity, field, value);
    }
    // Get associated data

    // Return the resulting array
    return result;
};

module.exports = {
    getInputType,
    search,
    display,
};