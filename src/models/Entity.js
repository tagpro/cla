class Entity {
    constructor () {
    }

    static getFields() {
        throw new Error('getFields if not implemented');
    }

    static getFieldType() {
        throw new Error('getFieldType if not implemented');
    }

    static get printKeys () {
        throw new Error('printKeys if not implemented. Need this to print');
    }
}

module.exports = Entity;