const chalk = require('chalk');

const log = {
    /**
     * Function to handle all the error logs.
     * @param {string} message Error message
     * @param {Object} error Error object is exists
     */
    error(message, error) {
        console.log(chalk.bgRed(message));
        console.error(error);
    },

    /**
     * Function to log everything to the console beautifully (Cyan color)
     * @param {string} message Print the message to the console
     */
    message(message) {
        console.log(chalk.cyan(message))
    },

    /**
     * Function to print objects as a table on console
     * @param {Object} obj This is an object that will be printed in tabular format if the
     * console supports it
     */
    table(obj) {
        if(console.hasOwnProperty('table')) {
            console.table(obj)
        } else {
            // Should work well if obj has toString
            console.log(obj);
        }
    }
}

module.exports = {
    log
};