const { CONSTANTS } = require('./../utils');
const Entity = require('./Entity');

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
        this._tickets = [];
        this._organistaion = null;
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
    /**
     * Returns all the fields in an array
     */
    static getFields() {
        return [
            ...User.commonFields,
            'organization_id',
        ];
    }

    static get printKeys() {
        return {
            myKeys: User.commonFields,
            associations: [{
                objKey: 'organization_id',
                entity: ORGANISATIONS
            }, {
                objKey: 'ticket_ids',
                entity: TICKETS
            }],
        };
    }

    /**
     * Returns the type of the field provided.
     *
     * @param {string} field The type of field
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

    toString() {
        return `User ${this._id}. Name: ${this.name}`;
    }
}

module.exports = User;