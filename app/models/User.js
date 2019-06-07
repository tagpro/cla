class User {
    /**
     * Returns all the fields in an array
     */
    static getFields() {
        return [
            'id',
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
            url: 'string',
            external_id: 'string',
            name: 'string',
            alias: 'string',
            created_at: 'string',
            active: 'boolean',
            verified: 'boolean',
            shared: 'boolean',
            locale: 'string',
            timezone: 'string',
            last_login_at: 'string',
            email: 'string',
            phone: 'string',
            signature: 'string',
            organization_id: 'number',
            tags: 'array',
            suspended: 'boolean',
            role: 'string',
        };

        return types[field];
    }
}

module.exports = User;