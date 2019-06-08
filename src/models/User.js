const { CONSTANTS } = require('./../utils');
const Entity = require('./Entity');
const { STRING, NUMBER, BOOLEAN, ARRAY } = CONSTANTS.TYPES;

class User extends Entity {
    constructor() {
        super();
    }
    /**
     * Returns all the fields in an array
     */
    static getFields() {
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
            'organization_id',
            'tags',
            'suspended',
            'role',
        ];
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
}

module.exports = User;