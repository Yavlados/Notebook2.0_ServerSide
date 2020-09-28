class EventGetters {
    static selectAll(client, _=undefined){
        return client.query('SELECT * FROM notebook2.event')
    }

    static searchById(client, id) {
        return client.query(`SELECT * FROM notebook2.event where event_id=${id}`)
    }

    static getEventPersonsId(client, event_id){
        return client.query(`SELECT person_id
        FROM notebook2.event_person
        WHERE event_id = ${event_id}`)
    }

}
module.exports = {
    EventGetters
}
