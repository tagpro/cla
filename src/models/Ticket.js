const Entity = require('./Entity');
const { CONSTANTS } = require('./../utils');

const { STRING, NUMBER, BOOLEAN, ARRAY } = CONSTANTS.TYPES;

module.exports = class Ticket extends Entity {
    constructor() {
        super();
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
        console.log('Ticket Object');
    }
};
