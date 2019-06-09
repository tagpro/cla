// Get data
// TODO: Manage data asynchronously - Web workers?
let { users, tickets, organisations, Entities } = require('./models');
let { User, Organisation, Ticket } = Entities;

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
        };
    }

    get users() {
        return this.mutateData.users;
    }

    get tickets() {
        return this.mutateData.tickets;
    }

    get organisations() {
        return this.mutateData.organisations;
    }

    // Asynchronously pre process data and update entities
    mutate() {
        // Update relationships here
        // Optimising Organisations
        let new_orgs = []
        for (let org of organisations) {
            new_orgs.push(new Organisation(org));
        }
        organisations = new_orgs;

        // Optimising Organisations
        let new_users = [];
        for (let user of users) {
            new_users.push(new User(user));
        }
        users = new_users;


        // Optimising Organisations
        let new_tickets = [];
        for (let ticket of tickets) {
            new_tickets.push(new Ticket(ticket));
        }
        tickets = new_tickets;
    }
}

// Singleton data pre-processor
const preProcessor = new DataProcessor();

let data = {
    getUsers(raw = false) {
        if (raw) return users;
        return [users, preProcessor.users];
    },

    getTickets(raw = false) {
        if (raw) return tickets;
        return [tickets, preProcessor.tickets];
    },

    getOrganisations(raw = false) {
        if (raw) return organisations;
        return [organisations, preProcessor.organisations];
    },

    getEntities() {
        return Entities;
    }
};

module.exports = {
    data,
    preProcessor,
};