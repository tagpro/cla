const Entity = require('./Entity');

module.exports = class Organisation extends Entity {
    constructor() {
        super();
    }

    toString() {
        console.log('Organisation Object');
    }
}
