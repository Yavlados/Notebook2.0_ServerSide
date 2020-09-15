class EventGetters {
    static selectAll(client){
        let responceRows = []
        client.query('SELECT * FROM public.EVENT', (err, res) => {
            if (err) throw err
            responceRows = res.rows
        })
        return  responceRows
    }

}
module.exports = {
    EventGetters
}
