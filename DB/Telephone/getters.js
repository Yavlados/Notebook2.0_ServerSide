class TelephoneGetters {
    static getPersonTelephones(client, id) {
        return client.query(`
        SELECT * 
        FROM notebook2.telephone
        WHERE person_id = ${id}`)
    }

}
module.exports = {
    TelephoneGetters
}