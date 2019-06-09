const Entity = require('./Entity');
const { CONSTANTS } = require('./../utils');

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
        this._asignee = null;
        this._organistaion = null;
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


    toString() {
        return `Ticket ${this._id}. Subject: ${this.subject}`;
    }
};
