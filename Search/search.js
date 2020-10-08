const { EventGetters } = require("../DB/Event/getters")
const { PersonGetters } = require("../DB/Person/getters")
const { TelephoneGetters } = require("../DB/Telephone/getters")
const { ContactGetters } = require("../DB/Contact/getters")
const { searchResponceTypes } = require("./searchResponceTypes.dto")

class SearchManager {
  constructor() {}

  static searchInDB(client, searchBody) {
    return new Promise((resolve, reject) => {
      const contact = { ...searchBody.persons[0].telephones[0].contacts[0] }
      const telephone = { ...searchBody.persons[0].telephones[0] }
      const person = { ...searchBody.persons[0] }
      const event = { ...searchBody }

      if (!!contact.alias.trim() || !!contact.number.trim())
        SearchManager.searchFromContact(client, contact).then((events) =>
          resolve(events)
        )
      else if (!!telephone.number.trim())
        SearchManager.searchFromTelephone(client, telephone).then((events) =>
          resolve(events)
        )
      else if (
        !!person.name.trim() ||
        !!person.lastname.trim() ||
        !!person.midname.trim() ||
        !!person.alias.trim()
      )
        SearchManager.searchFromPerson(client, person).then((events) =>
          resolve(events)
        )
    })
  }

  static searchFromContact(client, contactData) {
    return new Promise((resolve, reject) => {
      let query = `SELECT DISTINCT telephone_id 
        FROM notebook2.contact WHERE`
      let contactSQLBody = ""
      if (!!contactData.number.trim())
        contactSQLBody += ` number ='${contactData.number}'`

      if (!!contactData.alias.trim()) {
        if (contactSQLBody.length !== 0) contactSQLBody += ` AND `

        contactSQLBody += ` alias='${contactData.alias}'`
      }

      if (contactSQLBody.length !== 0) {
        client.query(query + contactSQLBody).then((dbResponce) => {
          let telephoneIds = dbResponce.rows
          if (telephoneIds.length === 0)
            resolve({ type: searchResponceTypes.empty })
          else {
            telephoneIds = telephoneIds.map(
              (telephone) => telephone.telephone_id
            )
            TelephoneGetters.getPersonIds(client, telephoneIds).then((events) =>
              resolve(events)
            )
          }
        })
      } else resolve({ type: searchResponceTypes.empty })
    })
  }

  static searchFromTelephone(client, telephoneData) {
    return new Promise((resolve, reject) => {
      let query = `SELECT DISTINCT person_id 
        FROM notebook2.telephone WHERE`

      let telephoneSQLBody = ""
      if (!!telephoneData.number.trim())
        telephoneSQLBody += ` number ='${telephoneData.number}'`

      if (telephoneSQLBody.length !== 0) {
        client.query(query + telephoneSQLBody).then((dbResponce) => {
          let personIds = dbResponce.rows
          if (personIds.length === 0)
            resolve({ type: searchResponceTypes.empty })
          else {
            personIds = personIds.map((person) => person.person_id)
            PersonGetters.getEventIds(client, personIds).then((events) =>
              resolve(events)
            )
          }
        })
      } else resolve({ type: searchResponceTypes.empty })
    })
  }

  static searchFromPerson(client, personData) {
    return new Promise((resolve, reject) => {
      let query = `SELECT DISTINCT id 
        FROM notebook2.person WHERE`

      let personSQLBody = ""
      if (!!personData.name.trim())
        personSQLBody += ` name ='${personData.name}'`

      if (!!personData.lastname.trim()) {
        if (personSQLBody.length !== 0) personSQLBody += ` AND `

        personSQLBody += ` lastname='${personData.lastname}'`
      }

      if (!!personData.midname.trim()) {
        if (personSQLBody.length !== 0) personSQLBody += ` AND `

        personSQLBody += ` midname='${personData.midname}'`
      }

      if (!!personData.alias.trim()) {
        if (personSQLBody.length !== 0) personSQLBody += ` AND `

        personSQLBody += ` alias='${personData.alias}'`
      }

      if (personSQLBody.length !== 0) {
        client.query(query + personSQLBody).then((dbResponce) => {
          let personIds = dbResponce.rows
          if (personIds.length === 0)
            resolve({ type: searchResponceTypes.empty })
          else {
            personIds = personIds.map((person) => person.id)
            PersonGetters.getEventIds(client, personIds).then((events) =>
              resolve(events)
            )
          }
        })
      } else resolve({ type: searchResponceTypes.empty })
    })
  }
}

module.exports = {
  SearchManager,
}
