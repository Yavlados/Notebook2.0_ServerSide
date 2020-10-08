const { searchResponceTypes } = require("../../Search/searchResponceTypes.dto")
const { TelephoneGetters } = require("../Telephone/getters")

class ContactGetters {
  static getTelephoneContacts(client, id) {
    return client.query(`
        SELECT *
        FROM notebook2.contact
        WHERE telephone_id = ${id}`)
  }
}
module.exports = {
  ContactGetters,
}
