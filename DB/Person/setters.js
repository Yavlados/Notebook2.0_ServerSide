const {TelephoneSetters} = require('../Telephone/setters')

class PersonSetters {
    static setPersonData(client, person) {
        person.telephones.map( telephone => {
            TelephoneSetters.setTelephoneData(client, telephone, person.id)
        })
    }

}
module.exports = {
    PersonSetters
}
