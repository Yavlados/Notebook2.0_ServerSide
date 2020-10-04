class PersonGetters {
    static getEventPersons(client, event_id) {
        return client.query(`
        SELECT person.id, person.lastname, person.name, person.midname, person.alias
		FROM notebook2.person
		WHERE id IN (SELECT person_id
        FROM notebook2.event_person
        WHERE event_person.event_id = ${event_id}) `)
    }

}
module.exports = {
    PersonGetters
}
