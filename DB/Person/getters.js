class PersonGetters {
  static getEventPersons(client, event_id) {
    return client.query(`
        SELECT person.id, person.lastname, person.name, person.midname, person.alias
		FROM notebook2.person
		WHERE id IN (SELECT person_id
        FROM notebook2.event_person
        WHERE event_person.event_id = ${event_id}) `)
  }

  static getEventIds(client, personIds) {
    return new Promise((resolve, reject) => {
      client
        .query(
          `SELECT *
        FROM notebook2.event
        WHERE id in
        ( SELECT DISTINCT event_id
                FROM notebook2.event_person
                WHERE event_person.person_id in (${personIds.join(",")}) )`
        )
        .then((dbResponce) => {
          const events = dbResponce.rows
          resolve(events)
        })
    })
  }
}

module.exports = {
  PersonGetters,
}
