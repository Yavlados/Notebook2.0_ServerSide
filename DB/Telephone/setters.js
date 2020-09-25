const {stateFlag} = require('../../flag.dto')
const { ContactSetters } = require('../Contact/setters')

class TelephoneSetters {
    static setTelephoneData(client, telephone, personId){
       

        switch(telephone.state){
            case stateFlag.isAdded:
                this.setInsertTelephone(client, telephone, personId)
                .then(dbResponce => {
                    const newId = dbResponce.rows[0].id
                    telephone.contacts.map( contact => {
                        ContactSetters.setContactData(client, contact, newId)
                    })
                })
                break
            case stateFlag.isReaded:
                telephone.contacts.map( contact => {
                    ContactSetters.setContactData(client, contact, telephone.id)
                })
                break
            case stateFlag.isUpdated:
                telephone.contacts.map( contact => {
                    ContactSetters.setContactData(client, contact, telephone.id)
                })
                break
        }
    }

    static setUpdateTelephone(){

    }

    static setInsertTelephone(client, telephone, personId){
        return client.query(`
        INSERT INTO notebook2.telephone (number, person_id, oldnum, internum)
        VALUES ('${telephone.number}', ${personId}, ${telephone.oldnum}, ${telephone.internum})
        RETURNING id`)
    }

}
module.exports = {
    TelephoneSetters
}