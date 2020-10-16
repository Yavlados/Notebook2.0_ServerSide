const { TelephoneSetters } = require("../Telephone/setters")
const { stateFlag } = require("../../flag.dto")

class PersonSetters {
  static setPersonData(client, person) {
    return new Promise((resolve, reject) => {
      switch (person.state) {
        case stateFlag.isAdded:
          PersonSetters.setInsertPerson(client, person).then((dbResponce) => {
            const newId = dbResponce.rows[0].id
            person.telephones.map((telephone) => {
              TelephoneSetters.setTelephoneData(client, telephone, newId)
            })
            resolve(newId)
          })
          break
        case stateFlag.isReaded:
          if (person.telephones)
            person.telephones.map((telephone) => {
              TelephoneSetters.setTelephoneData(client, telephone, person.id)
            })
          resolve(person.id)
          break
        case stateFlag.isUpdated:
          person.telephones.map((telephone) => {
            TelephoneSetters.setTelephoneData(client, telephone, person.id)
          })
          PersonSetters.setUpdatePerson(client, person).then(
            (dbResponce) => true
          )
          resolve(person.id)
          break
        case stateFlag.isRemoved:
          PersonSetters.setRemovePerson(client, person).then((dbResponce) => {
            true
          })
          break
      }
    })
  }

  static setInsertPerson(client, person) {
    return client.query(`
        INSERT INTO notebook2.person (lastname, name, midname, alias)
        VALUES ('${person.lastname}','${person.name}', '${person.midname}','${person.alias}')
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

  static setRemovePersons(client, personsIds) {
    let query = `DELETE
        FROM notebook2.person
        WHERE id IN (`
    personsIds.map((row, index) => {
      if (index === 0) query += `${row.person_id}`
      else query += `,${row.person_id}`
    })
    query += ")"
    client.query(query).then((_) => true)
  }

  static setRemovePerson(client, person) {
    return client.query(`
        DELETE 
        FROM notebook2.person
        WHERE id=${person.id}`)
  }
}
module.exports = {
  PersonSetters,
}
