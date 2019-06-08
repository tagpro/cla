const Entity = require('./Entity');

module.exports = class Ticket extends Entity{
    constructor() {
        super();
    }

    toString() {
        console.log('Ticket Object');
    }
}
