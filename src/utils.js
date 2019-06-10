const chalk = require('chalk');

const CONSTANTS = {
    ENTITIES: {
        USERS: 'users',
        ORGANISATIONS: 'organisations',
        TICKETS: 'tickets',
    },
    TYPES: {
        NUMBER: 'number',
        STRING: 'string',
        BOOLEAN: 'boolean',
        ARRAY: 'array',
    },
};

const log = {
    /**
     * Function to determing if we want to apply chalk function or print
     * an object natively.
     *
     * @param {Object} chalkInstance A chalk function used for output
     * @param {Object} obj String/Object to be printed to console
     */
    print(chalkInstance, obj) {
        return typeof obj === 'object' ? obj : chalkInstance(obj)
    },

    /**
     * Function to handle all the error logs.
     * @param {string} message Error message
     * @param {object} error Error object is exists
     */

    error(message, error) {
        console.log(this.print(chalk.bgRed, message));
        console.error(error);
    },

    success(...message) {
        console.log(chalk.bgGreen(...message));
    },
    /**
     * Function to log everything to the console beautifully (Cyan color)
     * @param {string} message Print the message to the console
     */
    message(...message) {
        console.log(chalk.cyan(...message));
    },

    simple(...message) {
        console.log(...message);
    },

    clear() {
        console.clear();
    },
};

let isEmpty = function (val) {
    return val == '' || val == null || val == undefined || val == [];
};

let normalize = function (val, type) {
    const { NUMBER, STRING, BOOLEAN, ARRAY } = CONSTANTS.TYPES;
    switch (type) {
        case NUMBER:
            return Number(val);
        case STRING:
        // A string would be inside the array. Search criteria is a string
        case ARRAY:
            return String(val);
        case BOOLEAN:
            return Boolean(val);
    }
    return val;
};

module.exports = {
    log,
    CONSTANTS,
    normalize,
    isEmpty,
};