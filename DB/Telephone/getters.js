const { ContactGetters } = require('../Contact/getters')

class TelephoneGetters {
    static getPersonTelephones(client, id) {
        return new Promise( (resolve, reject) => {
            client.query(`
            SELECT *
            FROM notebook2.telephone
            WHERE person_id = ${id}`)
            .then( dbResponce => {
                const {
                    rows
                } = dbResponce
                TelephoneGetters.getTelephoneContacts(client, rows)
                .then( telephones => resolve(telephones) )
            })
        })
    }

    static getTelephoneContacts(client, telephones){
        return new Promise( (resolve, reject) => {
            telephones.map( (telephone, index) => {
                ContactGetters.getTelephoneContacts(client, telephone.id)
                .then( dbRes => {
                    const {
                        rows
                    } = dbRes
                    telephone.contacts = rows
                    if(index === telephones.length-1)
                        resolve(telephones)
                })
            })
        })
    }

}
module.exports = {
    TelephoneGetters
}