// Get data
// TODO: Manage data asynchronously - Web workers?
let { users, tickets, organisations, Entities } = require('./models');

// Set data
// TODO: Hash on tags in users, map up organisation_id, tickets
// Join everything here. Return existing user json or a new user json
// depending on the processing

// Mutate file?

let data = {
    getUsers() {
        return users;
    },

    getEntities() {
        return Entities;
    }
}

module.exports = {
    data
};