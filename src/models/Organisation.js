const Entity = require('./Entity');
const { CONSTANTS } = require('./../utils');
const { STRING, NUMBER, BOOLEAN, ARRAY } = CONSTANTS.TYPES;
const chalk = require('chalk');

module.exports = class Organisation extends Entity {
    constructor(organisation) {
        super();
        // These fields are from a data source
        let fields = Organisation.getFields();
        // Setting up all fields
        for (let field of fields) {
            let val = this.normalize(field, organisation[field], Organisation.getFieldType(field));
            this[field] = val;
        }
        this._tickets = [];
        this._users = [];
    }

    get indexKeys () {
        return ['_id', 'external_id', 'name'];
    }

    get users() {
        return this._users;
    }

    addUser(user) {
        this._users.push(user);
    }

    get tickets() {
        return this._tickets;
    }

    addTicket(ticket) {
        this._tickets.push(ticket);
    }

    static get commonFields() {
        return [
            '_id',
            'url',
            'external_id',
            'name',
            'domain_names',
            'created_at',
            'details',
            'shared_tickets',
            'tags',
        ];
    }

    static getFields() {
        return Organisation.commonFields;
    }

    static get relatedFields() {
        return [];
    }

    static getFieldType(field) {
        let fieldTypes = {
            '_id': NUMBER,
            'url': STRING,
            'external_id': STRING,
            'name': STRING,
            'domain_names': ARRAY,
            'created_at': STRING,
            'details': STRING,
            'shared_tickets': BOOLEAN,
            'tags': ARRAY,
        };

        return fieldTypes[field];
    }

    static get printKeys() {
        return {
            myKeys: Organisation.commonFields,
            associations: [],
        };
    }

    log() {
        for (let key of Organisation.getFields()) {
            this.spaciousPrint(key, this[key]);
        }

        console.log();
        console.group('*** Related Details ***');
        console.log(chalk.bgWhite(chalk.black(`Number of submitted tickets - ${this.tickets.length}`)));
        if (this.tickets.length > 0) {
            for (let i in this.tickets) {
                let ticket = this.tickets[i];
                console.log(chalk.bgYellow(`== ${Number(i) + 1} ==`));
                this.spaciousPrint('external_id', ticket.external_id);
                this.spaciousPrint('subject', ticket.subject);
            }
        }

        console.log();
        console.log(chalk.bgWhite(chalk.black(`Number of assigned tickets - ${this.users.length}`)));
        if (this.users.length > 0) {
            for (let i in this.users) {
                let user = this.users[i];
                console.log(chalk.bgYellow(`== ${Number(i) + 1} ==`));
                this.spaciousPrint('external_id', user.external_id);
                this.spaciousPrint('name', user.name);
            }
        }
        console.groupEnd();
    }
};
