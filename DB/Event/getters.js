class EventGetters {
    static selectAll(client, _=undefined){
        return client.query('SELECT * FROM notebook2.event')
    }

    static searchById(client, id) {
        return client.query(`SELECT * FROM notebook2.event where event_id=${id}`)
    }

}
module.exports = {
    EventGetters
}
