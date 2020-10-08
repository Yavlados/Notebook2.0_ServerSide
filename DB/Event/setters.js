const { PersonSetters } = require("../Person/setters")
const { stateFlag } = require("../../flag.dto")
const { EventGetters } = require("./getters")

class EventSetters {
  static setEventData(client, event) {
    return new Promise((resolve, reject) => {
      let linkedPersonsId = []
      event.persons.map((person) =>
        PersonSetters.setPersonData(client, person).then((personId) => {
          if (person.state === stateFlag.isAdded) linkedPersonsId.push(personId)
        })
      )

      switch (event.state) {
        case stateFlag.isAdded:
          EventSetters.setInsertEvent(client, event).then((dbResponce) => {
            const newId = dbResponce.rows[0].id
            EventSetters.setLinksEventPerson(
              client,
              newId,
              linkedPersonsId
            ).then((debResp) => resolve(true))
          })
          break
        case stateFlag.isReaded:
          break
        case stateFlag.isUpdated:
          EventSetters.setUpdateEvent(client, event).then((dbResponce) => {
            EventSetters.setLinksEventPerson(
              client,
              event.id,
              linkedPersonsId
            ).then((debResp) => resolve(true))
          })
          break
      }
    })
  }

  static setRemoveEvent(client, event) {
    return new Promise((resolve, reject) => {
      EventGetters.getEventPersonsId(client, event.id).then((dbResponce) => {
        const { rows } = dbResponce
        if (rows.length !== 0) {
          PersonSetters.setRemovePersons(client, rows)
        }
        client
          .query(
            `DELETE
                        FROM notebook2.event
                        WHERE id=${event.id}`
          )
          .then((_) => resolve(true))
      })
    })
  }

  static setUpdateEvent(client, event) {
    return client.query(`
        UPDATE notebook2.event
        SET 
        category = '${event.category}',
        detention_date = '${event.detention_date}', 
        detention_time = '${event.detention_time}', 
        detention_reason = '${event.detention_reason}',
        detention_by = '${event.detention_by}', 
        keeping_place = '${event.keeping_place}', 
        additional = '${event.additional}'
        WHERE id = ${event.id}`)
  }

  static setInsertEvent(client, event) {
    return client.query(`
        INSERT INTO notebook2.event (category, 
            detention_date, 
            detention_time, 
            detention_reason, 
            detention_by, 
            keeping_place, 
            additional)
        VALUES ('${event.category}', 
            '${event.detention_date}', 
            '${event.detention_time}', 
            '${event.detention_reason}', 
            '${event.detention_by}', 
            '${event.keeping_place}', 
            '${event.additional}')
            RETURNING id`)
  }

  static setLinksEventPerson(client, eventId, personIds) {
    return new Promise((resolve, reject) => {
      personIds.map((person_id) => {
        client
          .query(
            `INSERT INTO notebook2.event_person (event_id, person_id)
                Values (${eventId}, ${person_id})`
          )
          .then((_) => true)
      })
      resolve(true)
    })
  }
}
module.exports = {
  EventSetters,
}
