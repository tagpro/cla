
const { CONSTANTS } = require('./../utils');

const { STRING, NUMBER, BOOLEAN, ARRAY } = CONSTANTS.TYPES;

class Entity {
    constructor () {
        this.tabWidth = 18;
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

    spaciousPrint(key, val) {
        let spaces = this.tabWidth - key.length > 0 ? this.tabWidth - key.length : 0;
        for (let i = 0; i < spaces; i++) {
            key += ' ';
        }
        console.log(`${key} : ${(String(val))}`);
    }

    normalize(field, value, type) {
        let isDefined = value != undefined;
        switch(type) {
            case STRING:
            case NUMBER:
            case BOOLEAN:
                return isDefined ? value : '';
            case ARRAY:
                return isDefined ? value: [];

        }
    }

    get indexKeys () {
        throw new Error('indexKeys is not defined. Cannot index this object');
    }
}

module.exports = Entity;