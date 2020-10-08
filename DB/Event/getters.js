class EventGetters {
  static selectAll(client) {
    return client.query("SELECT * FROM notebook2.event")
  }

  static getEventPersonsId(client, event_id) {
    return client.query(`SELECT person_id
        FROM notebook2.event_person
        WHERE event_id = ${event_id}`)
  }

  static getSearchEvent(client, eventData) {
    ;`SELECT * 
        FROM notebook2.event
        WHERE category =''
        AND detention_date=''
        AND detention_time=''
        AND detention_reason=''
        AND detention_by=''
        AND keeping_place=''
        AND additional=''
        AND id= 1`
  }
}
module.exports = {
  EventGetters,
}
