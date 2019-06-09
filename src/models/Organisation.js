const Entity = require('./Entity');
const { CONSTANTS } = require('./../utils');
const { STRING, NUMBER, BOOLEAN, ARRAY } = CONSTANTS.TYPES;

module.exports = class Organisation extends Entity {
    constructor(organisation) {
        super();
        // These fields are from a data source
        let fields = Organisation.getFields();
        // Setting up all fields
        for (let field of fields) {
            let val = organisation[field] ? organisation[field] : '';
            this[field] = val;
        }
        this._tickets = [];
        this._users = [];
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

    toString() {
        console.log('Organisation Object');
    }
};
