class Entity {
    constructor () {
        this.getFields = this.getFields.bind(this);
        this.getFieldType = this.getFieldType.bind(this);
    }
    static getFields() {
        throw new Error('getFields if not implemented');
    }

    static getFieldType() {
        throw new Error('getFieldType if not implemented');
    }
}

module.exports = Entity;