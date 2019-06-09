// Get data
// TODO: Manage data asynchronously - Web workers?
let { users, tickets, organisations, Entities } = require('./models');
let { User, Organisation, Ticket } = Entities;
let { CONSTANTS: { ENTITIES: { USERS, TICKETS, ORGANISATIONS } } } = require('./utils');

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

    getUser(id) {
        let user = null;
        if(id){
            try {
                user = this.mutateData[USERS]._id[id][0];
            } catch (error) {
                // May be the id does not exist in the current database, weird.
                user = null;
            }
        }
        return user;
    }

    getTicket(id) {
        let ticket = null;
        if(id){
            try {
                ticket = this.mutateData[TICKETS]._id[id][0];
            } catch (error) {
                // May be the id does not exist in the current database, weird.
                ticket = null;
            }
        }
        return ticket;
    }

    getOrganisation(id) {
        let org = null;
        if(id){
            try {
                org = this.mutateData[ORGANISATIONS]._id[id][0];
            } catch (error) {
                // May be the id does not exist in the current database, weird.
                org = null;
            }
        }
        return org;
    }

    optimise(obj, Entity, entityKey) {
        let newEntity = new Entity(obj);
        // Index other keys
        try {
            // TODO: Take care of non existent keys : Add null
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
            const newOrg = this.optimise(org, Organisation, ORGANISATIONS);
            newOrgs.push(newOrg);
        }
        organisations = newOrgs;
        // Optimising Users
        let newUsers = [];
        for (let user of users) {
            const newUser = this.optimise(user, User, USERS);
            newUsers.push(newUser);
            // Add user to organisation using _id as a unique identifier
            let org = this.getOrganisation(newUser.organization_id);
            if (org) {
                org.addUser(newUser);
                newUser.updateOrganistaion(org);
            }
        }
        users = newUsers;


        // Optimising Tickets
        let newTickets = [];
        for (let ticket of tickets) {
            const newTicket = this.optimise(ticket, Ticket, TICKETS);
            newTickets.push(newTicket);

            // Add ticket to submitter user
            let submitter = this.getUser(newTicket.submitter_id);
            if(submitter) {
                submitter.addTicket(newTicket, true);
                newTicket.submitter = submitter;
            }

            // Add ticket to assignee
            let assignee = this.getUser(newTicket.assignee_id);
            if (assignee) {
                assignee.addTicket(newTicket);
                newTicket.assignee = assignee;
            }

            // Add ticket to Organistaion
            let org = this.getOrganisation(newTicket.organization_id);
            if (org) {
                org.addTicket(newTicket);
                newTicket.organisation = org;
            }

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