const {stateFlag} = require('../../flag.dto')

class ContactSetters {
    static setContactData(client, contact, telephoneId){
        switch(contact.state){
            case stateFlag.isAdded:
                this.setInsertContact(client, contact, telephoneId)
                .then( dbResponce => 
                    console.log(dbResponce)
                    )
                break
            case stateFlag.isReaded:
                break
            case stateFlag.isUpdated:
                setUpdateContact(client, contact, telephoneId)
                break
        }
    }

    static setUpdateContact(client, contact, telephoneId){

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