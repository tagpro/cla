const { CONSTANTS, log, isEmpty } = require('./utils');
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

/**
 * The class defines the properties we can create search criteria on.
 *
 * @param {string} entityChoice The the choice of entity selected
 * @returns the class of the Entity we are searching for.
 */
let getEntity = function(entityChoice) {
    let { USERS, TICKETS, ORGANISATIONS } = CONSTANTS.ENTITIES, Entity;
    try {
        let { Organisation, User, Ticket } = data.getEntities();
        switch (entityChoice) {
            case USERS: {
                Entity = User;
                break;
            }
            case TICKETS: {
                Entity = Ticket;
                break;
            }
            case ORGANISATIONS: {
                Entity = Organisation;
                break;
            }
            default:
                throw TypeError(`Type ${entityChoice} does not exist`);
        }
    } catch (error) {
        log.error('Error while fetching option fields', error);
    }
    return Entity;
};

/**
 * @param {any} choiceType type of the field searching for
 * @returns the inquirer prompt type for corresponding data type of field.
 */
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
/**
 * Loop through all the entities present and return the array of entities found.
 *
 * @param {string} entity The type of entity to search. Should match with Constants defined
 * @param {string} field The name of the property user is searching for
 * @param {any} value Value of the the field. Should be String, Number, Boolean or null
 *
 * @returns The list of entities matching the criteria
 */
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
        results = entities.filter((entry) => {
            let type = Entity.getFieldType(field);
            // Match null criteria
            if (value == null && (isEmpty(entry[field]))) {
                return true;
            }
            if (entry.hasOwnProperty(field)) {
                if (type == ARRAY && entry[field].indexOf(value) > 0) {
                    return true;
                } else if (entry[field] == value) {
                    return true;
                }
            }
            return false;
        });
    } catch (error) {
        log.error('Error while performing simple search for ' +
            `${field} with value ${value} under ${entity}`, error);
    }
    return results;

};

// Advanced key based search (primary search - use map from data.js)
/**
 * This function will search inside indexes created and if the index is not present for field then
 * it will return false.
 *
 * @param {string} entity The type of entity to search. Should match with Constants defined
 * @param {string} field The name of the property user is searching for
 * @param {any} value Value of the the field. Should be String, Number, Boolean or null
 *
 * @returns The list of entities matching the criteria if index exists or returns false
 */
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
            default:
                throw TypeError(`Cannot find Entity of type ${entity}`);
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

// Prepare search
/**
 * Search for entities that are persent in our given dataset. Matches using
 * type of entity searching for, field name and value name.
 *
 * It will try to look into the indexes and if the index is absent, then it will
 * search inside the entire dataset.
 *
 * @param {string} entity The type of entity to search. Should match with Constants defined
 * @param {string} field The name of the property user is searching for
 * @param {any} value Value of the the field. Should be String, Number, Boolean or null
 *
 * @returns The list of entities matching the criteria
 */
let search = function (entity, field, value) {
    // Find out if we can search the field on an entity using advanced mode
    let searchResult = testAdvancedSearch(entity, field, value);
    let result = [];

    // Do advanced search if possible
    if (searchResult) {
        result = searchResult;
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
    getEntity,
};
