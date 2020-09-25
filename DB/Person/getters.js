class PersonGetters {
    static getEventPersons(client, id) {
        return client.query(`
        SELECT DISTINCT person.id, person.lastname, person.name, person.midname, person.alias
        FROM notebook2.person, notebook2.event_person
        WHERE event_person.event_id = ${id}`)
    }

}
module.exports = {
    PersonGetters
}
