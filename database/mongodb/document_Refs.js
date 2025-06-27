const EventEmitter = require('node:events');

class DocRefs extends EventEmitter {

    constructor() {
        super()
    }

    RefOperatorToCountry(ref, countryId) {
        this.emit('setOpeRefToCountry', ref, countryId)
    }

   

    DelOpeRefFromCountry(ref, countryId) {
        this.emit('delOpeRefFromCountry', ref, countryId)
    }

    RefAccountToUser(ref, userId) {
        this.emit('setAccRefToUser', ref, userId)
    }
    DelAccRefFromUser(ref, userId) {
        this.emit('delAccRefFromUser', ref, userId)
    }



}

module.exports = new DocRefs()