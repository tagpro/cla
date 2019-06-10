// Get data
let { users, tickets, organisations, Entities } = require('./models');
let { User, Organisation, Ticket } = Entities;
let { CONSTANTS: { ENTITIES: { USERS, TICKETS, ORGANISATIONS } }, isEmpty } = require('./utils');

// Set data
class DataProcessor {
    constructor() {
        this.mutateData = {
            [USERS]: {},
            [TICKETS]: {},
            [ORGANISATIONS]: {},
        };
    }

    /**
     * Get mutated and indexed User data
     */
    get users() {
        return this.mutateData.users;
    }

    /**
     * Get mutated and indexed Tickets data
     */
    get tickets() {
        return this.mutateData.tickets;
    }

    /**
     * Get mutated and indexed Organisation data
     */
    get organisations() {
        return this.mutateData.organisations;
    }

    /**
     * Get User object for the id
     *
     * @param {number} id Unique id of the user matched using field _id
     */
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

    /**
     * Get Ticket object for the id
     *
     * @param {string} id Unique id of the ticket matched using field _id
     */
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


    /**
     * Get Organisation object for the id
     *
     * @param {number} id Unique id of the organisation matched using field _id
     */
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

    /**
     * Function will create the new Object for an Entity and all the indexes that is defined
     * in Entity into the mutatedData of this class.
     *
     * It creates hashes of different indexes to search for them faster.
     *
     * @param {object} obj Object from the data source
     * @param {Class} Entity A Class that will save the data for the obj
     * @param {string} entityKey The key used in this.mutatedData to identify the Entity.
     *
     * @returns {object} new entity created for the obj
     */
    optimise(obj, Entity, entityKey) {
        let newEntity = new Entity(obj);
        try {
            // Index keys
            for (let key of newEntity.indexKeys) {
                let normalizedKey = isEmpty(newEntity[key]) ? null : newEntity[key];
                // Create key if not available for index if not available
                if (!this.mutateData[entityKey].hasOwnProperty(key)) {
                    this.mutateData[entityKey][key] = {};
                }
                // Create hash key for the field value if not present
                if (!this.mutateData[entityKey][key].hasOwnProperty(normalizedKey)) {
                    this.mutateData[entityKey][key][normalizedKey] = [newEntity];
                } else {
                    this.mutateData[entityKey][key][normalizedKey].push(newEntity);
                }
            }
        } catch (error) {
            log.error(`Failed to optimize ${entityKey}`, error);
        }
        return newEntity;
    }

    /**
     * Pre-process data and update entities
     * Create new objects for all the Entities and create relationships between them.
     *
     * Uses references to store the linked entity.
     */
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
                newUser.organisation = org;
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
    /**
     * @param {boolean} raw If true, returns only the user list and not the indexes
     * @returns all the users and indexes
     */
    getUsers(raw = false) {
        if (raw) return users;
        return [users, preProcessor.users];
    },

    /**
     * @param {boolean} raw If true, returns only the ticket list and not the indexes
     * @returns all the tickets and indexes
     */
    getTickets(raw = false) {
        if (raw) return tickets;
        return [tickets, preProcessor.tickets];
    },

    /**
     * @param {boolean} raw If true, returns only the organisation list and not the indexes
     * @returns all the organisation and indexes
     */
    getOrganisations(raw = false) {
        if (raw) return organisations;
        return [organisations, preProcessor.organisations];
    },

    /**
     * @returns the classes for all the entities
     */
    getEntities() {
        return Entities;
    }
};

module.exports = {
    data,
    preProcessor,
};