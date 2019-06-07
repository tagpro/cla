const chalk = require('chalk');

const CONSTANTS = {
    ENTITIES: {
        USERS: 'users',
        ORGANISATIONS: 'organisations',
        TICKETS: 'tickets',
    },
}

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

    /**
     * Function to log everything to the console beautifully (Cyan color)
     * @param {string} message Print the message to the console
     */
    message(message) {
        if (Array.isArray(message)) {
            for (let m of message) {
                console.log(this.print(chalk.cyan, m))
            }
        } else {
            console.log(this.print(chalk.cyan, message))
        }
    },

    simple(message) {
        console.log(message);
    },

    /**
     * Function to print objects as a table on console
     * @param {Object} obj This is an object that will be printed in tabular format if the
     * console supports it
     */
    table(obj) {
        if (console.hasOwnProperty('table')) {
            console.table(obj)
        } else {
            // Should work well if obj has toString
            console.log(obj);
        }
    }
}

module.exports = {
    log,
    CONSTANTS
};