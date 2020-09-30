const {stateFlag} = require('../../flag.dto')
const { ContactSetters } = require('../Contact/setters')

class TelephoneSetters {
    static setTelephoneData(client, telephone, personId){
        switch(telephone.state){
            case stateFlag.isAdded:
                TelephoneSetters.setInsertTelephone(client, telephone, personId)
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
                TelephoneSetters.setUpdateTelephone(client, telephone)
                .then( dbResponce =>
                    true
                   )
                break
            case stateFlag.isRemoved:
                    TelephoneSetters.setRemoveTelephone(client, telephone)
                    .then(dbResponce => {
                        true
                    })
                break
        }
    }

    static setUpdateTelephone(client, telephone){
        return client.query(`
        UPDATE notebook2.telephone
        SET number = '${telephone.number}',
        oldnum = ${telephone.oldnum},
        internum= ${telephone.internum}
        WHERE id = ${telephone.id}`)
    }

    static setInsertTelephone(client, telephone, personId){
        return client.query(`
        INSERT INTO notebook2.telephone (number, person_id, oldnum, internum)
        VALUES ('${telephone.number}', ${personId}, ${telephone.oldnum}, ${telephone.internum})
        RETURNING id`)
    }

    static setRemoveTelephone(client, telephone) {
        return client.query(`
        DELETE 
        FROM notebook2.telephone
        WHERE id=${telephone.id}`)
    }
}
module.exports = {
    TelephoneSetters
}