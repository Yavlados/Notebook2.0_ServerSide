const {
    TelephoneSetters
} = require('../Telephone/setters')
const {
    stateFlag
} = require('../../flag.dto')

class PersonSetters {
    static setPersonData(client, person) {
        switch (person.state) {
            case stateFlag.isAdded:
                PersonSetters.setInsertPerson(client, person)
                    .then(dbResponce => {
                        const newId = dbResponce.rows[0].id
                        person.telephones.map(telephone => {
                            TelephoneSetters.setTelephoneData(client, telephone, newId)
                        })
                    })
                break
            case stateFlag.isReaded:
                person.telephones.map(telephone => {
                    TelephoneSetters.setTelephoneData(client, telephone, person.id)
                })
                break
            case stateFlag.isUpdated:
                person.telephones.map(telephone => {
                    TelephoneSetters.setTelephoneData(client, telephone, person.id)
                })
                PersonSetters.setUpdatePerson(client, person)
                    .then(dbResponce =>
                        true
                    )
                break
        }
    }

    static setInsertPerson(client, person) {
        return client.query(`
        INSERT INTO notebook2.person (lastname, name, midname, alias)
        VALUES ('${person.name}','${person.lastname}', '${person.midname}','${person.alias}')
        RETURNING id`)
    }

    static setUpdatePerson(client, person) {
        return client.query(`
        UPDATE notebook2.person
        SET lastname = '${person.lastname}',
        name = '${person.name}',
        midname= '${person.midname}',
        alias = '${person.alias}'
        WHERE id = ${person.id}`)
    }
}
module.exports = {
    PersonSetters
}