class EventGetters {
  static selectAll(client) {
    return client.query("SELECT * FROM notebook2.event")
  }

  static getById(client, id) {
    return client.query(`SELECT * 
    FROM notebook2.event
    WHERE id = ${id}`)
  }

  static getEventPersonsId(client, event_id) {
    return client.query(`SELECT person_id
        FROM notebook2.event_person
        WHERE event_id = ${event_id}`)
  }
}
module.exports = {
  EventGetters,
}
