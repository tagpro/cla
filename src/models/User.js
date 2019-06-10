const { CONSTANTS } = require('./../utils');
const Entity = require('./Entity');
const chalk = require('chalk');

const { STRING, NUMBER, BOOLEAN, ARRAY } = CONSTANTS.TYPES;
const { ORGANISATIONS, TICKETS } = CONSTANTS.ENTITIES;

class User extends Entity {
    constructor(user) {
        super();
        // These fields are from a data source
        let fields = User.getFields();
        // Setting up all fields
        for (let field of fields) {
            let val = this.normalize(field, user[field], User.getFieldType(field));
            this[field] = val;
        }
        this._submittedTickets = [];
        this._assignedTickets = [];
        this._organisation = null;
    }

    /**
     * @returns the indexes used to optimize search
     */
    get indexKeys() {
        return ['_id', 'external_id', 'name', 'email'];
    }

    get organisation() {
        return this._organisation;
    }

    set organisation(org) {
        this._organisation = org;
    }

    get submittedTickets() {
        return this._submittedTickets;
    }

    get assignedTickets() {
        return this._assignedTickets;
    }

    addTicket(ticket, submitter = false) {
        if (submitter) {
            this._submittedTickets.push(ticket);
        } else {
            this._assignedTickets.push(ticket);
        }
    }

    static get commonFields() {
        return [
            '_id',
            'url',
            'external_id',
            'name',
            'alias',
            'created_at',
            'active',
            'verified',
            'shared',
            'locale',
            'timezone',
            'last_login_at',
            'email',
            'phone',
            'signature',
            'tags',
            'suspended',
            'role',
        ];
    }

    static get relatedFields() {
        return ['organization_id'];
    }

    /**
     * @returns all the fields in the object
     */
    static getFields() {
        return [
            ...User.commonFields,
            ...this.relatedFields,
        ];
    }

    /**
     * @param {string} field The type of field
     * @returns the type of the field provided.
     */
    static getFieldType(field) {
        const types = {
            _id: NUMBER,
            url: STRING,
            external_id: STRING,
            name: STRING,
            alias: STRING,
            created_at: STRING,
            active: BOOLEAN,
            verified: BOOLEAN,
            shared: BOOLEAN,
            locale: STRING,
            timezone: STRING,
            last_login_at: STRING,
            email: STRING,
            phone: STRING,
            signature: STRING,
            organization_id: NUMBER,
            tags: ARRAY,
            suspended: BOOLEAN,
            role: STRING,
        };

        return types[field];
    }


    /**
     * Pretty prints the object and its relations
     */
    log() {
        for (let key of User.getFields()) {
            this.spaciousPrint(key, this[key]);
        }

        console.log();
        console.group('*** Related Details ***');
        console.log(chalk.bgWhite(chalk.black(`Number of submitted tickets - ${this.submittedTickets.length}`)));
        if (this.submittedTickets.length > 0) {
            for (let i in this.submittedTickets) {
                let ticket = this.submittedTickets[i];
                console.log(chalk.bgYellow(`== ${Number(i) + 1} ==`));
                this.spaciousPrint('external_id', ticket.external_id);
                this.spaciousPrint('subject', ticket.subject);
            }
        }

        console.log();
        console.log(chalk.bgWhite(chalk.black(`Number of assigned tickets - ${this.assignedTickets.length}`)));
        if (this.assignedTickets.length > 0) {
            for (let i in this.assignedTickets) {
                let ticket = this.assignedTickets[i];
                console.log(chalk.bgYellow(`== ${Number(i) + 1} ==`));
                this.spaciousPrint('external_id', ticket.external_id);
                this.spaciousPrint('subject', ticket.subject);
            }
        }

        console.log();
        console.log(chalk.bgWhite(chalk.black(`Organisation`)));
        if (this.organisation) {
            this.spaciousPrint('external_id', this.organisation.external_id);
            this.spaciousPrint('name', this.organisation.name);
        }
        console.groupEnd();
    }
}

module.exports = User;