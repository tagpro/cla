// Get data
// TODO: Manage data asynchronously - Web workers?
let { users, tickets, organisations, Entities } = require('./models');
let { User, Organisation, Ticket } = Entities;
let {CONSTANTS: {ENTITIES: {USERS, TICKETS, ORGANISATIONS}}} = require('./utils');

// Set data
// TODO: Hash on tags in users, map up organisation_id, tickets
// Join everything here. Return existing user json or a new user json
// depending on the processing
class DataProcessor {
    constructor() {
        this.mutateData = {
            [USERS]: {},
            [TICKETS]: {},
            [ORGANISATIONS]: {},
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
    optimise(obj, Entity, entityKey) {
        let newEntity = new Entity(obj);
        // Index other keys
        try {
            for (let key of newEntity.indexKeys) {
                if (!this.mutateData[entityKey].hasOwnProperty(key)) {
                    this.mutateData[entityKey][key] = {};
                }
                if (!this.mutateData[entityKey][key].hasOwnProperty(newEntity[key])) {
                    this.mutateData[entityKey][key][newEntity[key]] = [newEntity];
                } else {
                    this.mutateData[entityKey][key][newEntity[key]].push(newEntity);
                }
            }
        } catch (error) {
            log.error(`Failed to optimize ${entityKey}`, error);
        }
        return newEntity;
    }
    // Asynchronously pre process data and update entities
    mutate() {
        // Update relationships here
        // Optimising Organisations
        let newOrgs = [];
        for (let org of organisations) {
            newOrgs.push(this.optimise(org, Organisation, ORGANISATIONS));
        }
        organisations = newOrgs;

        // Optimising Users
        let newUsers = [];
        for (let user of users) {
            newUsers.push(this.optimise(user, User, USERS));
        }
        users = newUsers;


        // Optimising Tickets
        let newTickets = [];
        for (let ticket of tickets) {
            newTickets.push(this.optimise(ticket, Ticket, TICKETS));
        }
        tickets = newTickets;
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