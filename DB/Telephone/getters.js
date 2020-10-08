const { ContactGetters } = require("../Contact/getters")
const { PersonGetters } = require("../Person/getters")

class TelephoneGetters {
  static getPersonTelephones(client, id) {
    return new Promise((resolve, reject) => {
      client
        .query(
          `
            SELECT *
            FROM notebook2.telephone
            WHERE person_id = ${id}`
        )
        .then((dbResponce) => {
          const { rows } = dbResponce
          TelephoneGetters.getTelephoneContacts(
            client,
            rows
          ).then((telephones) => resolve(telephones))
        })
    })
  }

  static getTelephoneContacts(client, telephones) {
    return new Promise((resolve, reject) => {
      const telPrms = telephones.map((telephone, index) => {
        return new Promise((resTel, rejTel) => {
          ContactGetters.getTelephoneContacts(client, telephone.id).then(
            (dbRes) => {
              const { rows } = dbRes
              let contacts = rows
              telephone.contacts = contacts
              resTel(telephone)
            }
          )
        })
      })

      Promise.all(telPrms).then((telephones) => resolve(telephones))
    })
  }

  static getPersonIds(client, telephoneIds) {
    return new Promise((resolve, reject) => {
      client
        .query(
          `
          SELECT DISTINCT person_id
          FROM notebook2.telephone
          WHERE id in (${telephoneIds.join(",")})`
        )
        .then((dbResponce) => {
          const personIds = dbResponce.rows.map((person) => person.person_id)
          PersonGetters.getEventIds(client, personIds).then((events) =>
            resolve(events)
          )
        })
    })
  }
}

module.exports = {
  TelephoneGetters,
}
