class EventGetters {
    static selectAll(client, _=undefined){
        return client.query('SELECT * FROM notebook2.EVENT')
    }

    static searchById(client, id) {
        console.log(id)
    }

}
module.exports = {
    EventGetters
}
