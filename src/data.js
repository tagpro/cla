// Get data
// TODO: Manage data asynchronously - Web workers?
let { users, tickets, organisations, Entities } = require('./models');

// Set data
// TODO: Hash on tags in users, map up organisation_id, tickets
// Join everything here. Return existing user json or a new user json
// depending on the processing
class DataProcessor {
    constructor() {
        this.mutateData = {
            users: {},
            tickets: {},
            organisations: {},
        }
    }

    get users() {
        return this.mutateData.users
    }

    get tickets() {
        return this.mutateData.tickets
    }

    get organisations() {
        return this.mutateData.users
    }

    // Asynchronously pre process data and update entities
    mutate() {
        // Update relationships here
    }
}

// Singleton data pre-processor
const preProcessor = new DataProcessor();

let mutateData = function () {

}

let data = {
    getUsers(raw = false) {
        if (raw) return users;
        return [users, preProcessor.users];
    },

    getTickets(raw = false) {
        if (raw) return tickets;
        return [tickets, preProcessor.tickets]
    },

    getOrganisations(raw = false) {
        if (raw) return organisations;
        return [organisations, preProcessor.organisations]
    },

    getEntities() {
        return Entities;
    }
}

module.exports = {
    data
};