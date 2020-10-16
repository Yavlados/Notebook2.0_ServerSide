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
      else if (
        !!event.category.trim() ||
        !!event.detention_by.trim() ||
        !!event.detention_date.trim() ||
        !!event.detention_reason.trim() ||
        !!event.detention_time.trim() ||
        !!event.keeping_place.trim() ||
        !!event.additional.trim()
      )
        SearchManager.searchFromEvent(client, event).then((events) =>
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

        contactSQLBody += ` LOWER(alias) LIKE LOWER('${contactData.alias}')`
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
        personSQLBody += ` LOWER(name) LIKE LOWER('${personData.name}')`

      if (!!personData.lastname.trim()) {
        if (personSQLBody.length !== 0) personSQLBody += ` AND `

        personSQLBody += ` LOWER(lastname) LIKE LOWER('${personData.lastname}')`
      }

      if (!!personData.midname.trim()) {
        if (personSQLBody.length !== 0) personSQLBody += ` AND `

        personSQLBody += ` LOWER(midname) LIKE LOWER('${personData.midname}')`
      }

      if (!!personData.alias.trim()) {
        if (personSQLBody.length !== 0) personSQLBody += ` AND `

        personSQLBody += ` LOWER(alias) LIKE LOWER('${personData.alias}')`
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

  static searchFromEvent(client, event) {
    return new Promise((resolve, reject) => {
      let query = `SELECT DISTINCT * 
        FROM notebook2.event WHERE`

      let eventSQLBody = ""
      if (!!event.category.trim())
        eventSQLBody += ` LOWER(category) LIKE LOWER('${event.category}')`

      if (!!event.detention_by.trim()) {
        if (eventSQLBody.length !== 0) eventSQLBody += ` AND `

        eventSQLBody += ` LOWER(detention_by) LIKE LOWER('${event.detention_by}')`
      }

      if (!!event.detention_date.trim()) {
        if (eventSQLBody.length !== 0) eventSQLBody += ` AND `

        eventSQLBody += ` LOWER(detention_date) LIKE LOWER('${event.detention_date}')`
      }

      if (!!event.detention_reason.trim()) {
        if (eventSQLBody.length !== 0) eventSQLBody += ` AND `

        eventSQLBody += ` LOWER(detention_reason) LIKE LOWER('${event.detention_reason}')`
      }

      if (!!event.detention_time.trim()) {
        if (eventSQLBody.length !== 0) eventSQLBody += ` AND `

        eventSQLBody += ` LOWER(detention_reason) LIKE LOWER('${event.detention_time}')`
      }

      if (!!event.keeping_place.trim()) {
        if (eventSQLBody.length !== 0) eventSQLBody += ` AND `

        eventSQLBody += ` LOWER(keeping_place) LIKE LOWER('${event.keeping_place}')`
      }

      if (!!event.additional.trim()) {
        if (eventSQLBody.length !== 0) eventSQLBody += ` AND `

        eventSQLBody += ` LOWER(additional) LIKE LOWER('${event.additional}')`
      }

      if (eventSQLBody.length !== 0) {
        client.query(query + eventSQLBody).then((dbResponce) => {
          let events = dbResponce.rows
          if (events.length === 0) resolve({ type: searchResponceTypes.empty })
          else {
            resolve(events)
          }
        })
      } else resolve({ type: searchResponceTypes.empty })
    })
  }
}

module.exports = {
  SearchManager,
}
