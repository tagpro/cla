const Entity = require('./Entity');
const { CONSTANTS } = require('./../utils');
const chalk = require('chalk');

const { STRING, NUMBER, BOOLEAN, ARRAY } = CONSTANTS.TYPES;

module.exports = class Ticket extends Entity {
    constructor(ticket) {
        super();
        // These fields are from a data source
        let fields = Ticket.getFields();
        // Setting up all fields
        for (let field of fields) {
            let val = this.normalize(field, ticket[field], Ticket.getFieldType(field));
            this[field] = val;
        }
        this._submitter = null;
        this._assignee = null;
        this._organistaion = null;
    }

    get indexKeys() {
        return ['_id', 'external_id', 'organization_id'];
    }

    get submitter() {
        return this._submitter;
    }

    set submitter(user) {
        this._submitter = user;
    }

    get assignee() {
        return this._assignee;
    }

    set assignee(user) {
        this._assignee = user;
    }

    get organistaion() {
        return this._organistaion;
    }

    updateOrganistaion(org) {
        this._organistaion = org;
    }

    // Standard fields
    static get commonFields() {
        return [
            '_id',
            'url',
            'external_id',
            'created_at',
            'type',
            'subject',
            'description',
            'priority',
            'status',
            'tags',
            'has_incidents',
            'due_at',
            'via',
        ];
    }

    static get relatedFields() {
        return [
            'submitter_id',
            'assignee_id',
            'organization_id',
        ];
    }

    static getFields() {
        return [
            ...Ticket.commonFields,
            ...Ticket.relatedFields,
        ];
    }

    static getFieldType(field) {
        let fieldTypes = {
            '_id': STRING,
            'url': STRING,
            'external_id': STRING,
            'created_at': STRING,
            'type': STRING,
            'subject': STRING,
            'description': STRING,
            'priority': STRING,
            'status': STRING,
            'tags': ARRAY,
            'has_incidents': BOOLEAN,
            'due_at': STRING,
            'via': STRING,
            'submitter_id': NUMBER,
            'assignee_id': NUMBER,
            'organization_id': NUMBER,
        };
        return fieldTypes[field];
    }

    static get printKeys() {
        return {
            myKeys: Ticket.commonFields,
            associations: [],
        };
    }


    log() {
        for (let key of Ticket.getFields()) {
            this.spaciousPrint(key, this[key]);
        }

        console.log();
        console.group('*** Related Details ***');
        console.log(chalk.bgWhite(chalk.black(`Submitter`)));
        if (this.submitter) {
            this.spaciousPrint('external_id', this.submitter.external_id);
            this.spaciousPrint('name', this.submitter.name);
        }

        console.log();
        console.log(chalk.bgWhite(chalk.black(`Assignee`)));
        if (this.assignee) {
            this.spaciousPrint('external_id', this.assignee.external_id);
            this.spaciousPrint('name', this.assignee.name);
        }

        console.log();
        console.log(chalk.bgWhite(chalk.black(`Organistaion`)));
        if (this.organistaion) {
            this.spaciousPrint('external_id', this.organistaion.external_id);
            this.spaciousPrint('name', this.organistaion.name);
        }
        console.groupEnd();
    }
};
