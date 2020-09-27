const {stateFlag} = require('../../flag.dto')

class ContactSetters {
    static setContactData(client, contact, telephoneId){
        switch(contact.state){
            case stateFlag.isAdded:
                ContactSetters.setInsertContact(client, contact, telephoneId)
                .then( dbResponce => 
                     true
                    )
                break
            case stateFlag.isReaded:
                break
            case stateFlag.isUpdated:
                ContactSetters.setUpdateContact(client, contact)
                .then( dbResponce => 
                    true
                   )
                break
        }
    }

    static setUpdateContact(client, contact){
        return client.query(`
        UPDATE notebook2.contact
        SET number = '${contact.number}',
        alias='${contact.alias}',
        oldnum = ${contact.oldnum},
        internum= ${contact.internum}
        WHERE id = ${contact.id}`)
    }

    static setInsertContact(client, contact, telephoneId){
        return client.query(`
        INSERT INTO notebook2.contact (number, alias, oldnum, internum, telephone_id)
        VALUES ('${contact.number}', '${contact.alias}', ${contact.oldnum}, ${contact.internum}, ${telephoneId})`)
    }

}
module.exports = {
    ContactSetters
}