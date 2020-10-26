const aesjs = require("aes-js")
const { statusCode } = require("../crypto.codes")

const { EventGetters } = require("../DB/Event/getters")
const { EventSetters } = require("../DB/Event/setters")

const { PersonGetters } = require("../DB/Person/getters")
const { TelephoneGetters } = require("../DB/Telephone/getters")
const { stateFlag } = require("../flag.dto")

class CryptoManager {
  aes
  defaultPassword = "eab88efa463a5820"

  constructor() {}

  generateKey(client) {
    return new Promise((resolve, reject) => {
      client.query(`SELECT uuid_generate_v1()`).then((dbResponce) => {
        const { rows } = dbResponce
        const uuid = rows[0].uuid_generate_v1
        this.setKey(uuid)
        resolve(uuid)
      })
    })
  }

  setKey(uuid) {
    const slicedKey = uuid.slice(3, 8) + uuid.slice(24, -1)
    this.aes = new aesjs.AES(this.passwordToArrayHandler(slicedKey)) //Have setted key to encoder
  }

  encode(data, password = undefined) {
    let aesLocal
    if (!!password) {
      aesLocal = new aesjs.AES(this.passwordToArrayHandler(password)) //Have setted key to encoder
    } else aesLocal = this.aes

    const data_string = JSON.stringify(data)
    let data_array = Array.from(aesjs.utils.utf8.toBytes(data_string))

    data_array = this.arraySizeHandler(data_array)
    let encoding_Result = []
    for (let i = 1; i <= data_array.length / 16; i++) {
      const batch = data_array.slice((i - 1) * 16, i * 16)
      const encryptedBytes = aesLocal.encrypt(batch)
      encoding_Result = encoding_Result.concat([...encryptedBytes])
    }
    return encoding_Result
  }

  decode(data, password = undefined) {
    const isPasswordRight = (data, aes) => {
      const batch = data.slice(0, 16)
      const encryptedBytes = aes.decrypt(batch)
      if (
        encryptedBytes[0] !== 123 && // char {
        encryptedBytes[0] !== 91 // char [
      ) {
        return false
      }
      return true
    }

    let localAes
    data = this.arraySizeHandler(data)
    if (!!password) {
      localAes = new aesjs.AES(this.passwordToArrayHandler(password))
    } else localAes = this.aes

    if (isPasswordRight(data, localAes)) {
      let decodingResult = []
      for (let i = 1; i <= data.length / 16; i++) {
        const batch = data.slice((i - 1) * 16, i * 16)
        const encryptedBytes = localAes.decrypt(batch)
        decodingResult = decodingResult.concat([...encryptedBytes])
      }
      let strResult = aesjs.utils.utf8
        .fromBytes(decodingResult)
        .replace(/\0/g, "")
      let res = JSON.parse(strResult)
      return res
    } else return "Error: Password is wrong"
  }

  arraySizeHandler(data_array) {
    if (data_array.length % 16 !== 0) {
      const lengthOfZeros =
        (~~(data_array.length / 16) + 1) * 16 - data_array.length
      const additionalArray = new Array(lengthOfZeros).fill(0)
      data_array = data_array.concat([...additionalArray])
    }
    return data_array
  }

  passwordToArrayHandler(password) {
    const encoder = new TextEncoder()
    const password_array = new Uint8Array(16)
    encoder.encodeInto(password, password_array)
    return password_array
  }

  handleRequest(requestFromClient, client) {
    return new Promise((resolve, reject) => {
      switch (requestFromClient) {
        case statusCode.keyIsUpdated:
          resolve(true)
          break
        case statusCode.updateKey:
          this.generateKey(client).then((uuid) => resolve({ uuid }))
          break
      }
    })
  }

  importManager(data, client) {
    return new Promise((resolve, reject) => {
      const { onImport, password } = data
      if (typeof onImport === "string" && onImport === "ALL") {
        this.prepareImportAll(client).then((data) => {
          if (!!password.trim())
            resolve({
              data: this.encode(data, password),
              isSecured: true,
            })
          else
            resolve({
              data: this.encode(data, this.defaultPassword),
              isSecured: false,
            })
        })
      }
    })
  }

  exportManager(exportData, client) {
    return new Promise((resolve, reject) => {
      const { data, password } = exportData
      let dataFromFile = this.decode(data, password)
      dataFromFile.forEach((event, eventId) => {
        event.state = stateFlag.isAdded
        if (event.persons)
          event.persons.map((person) => {
            person.state = stateFlag.isAdded
            if (person.telephones)
              person.telephones.map((telephone) => {
                telephone.state = stateFlag.isAdded
                if (telephone.contacts)
                  telephone.contacts.map((contact) => {
                    contact.state = stateFlag.isAdded
                  })
              })
          })
      })

      const eventsPrms = dataFromFile.map((event, eventId) => {
        return new Promise((evres, evrej) => {
          EventSetters.setEventData(client, event).then((result) =>
            evres(result)
          )
        })
      })

      Promise.all(eventsPrms).then((results) => resolve(results))
    })
  }

  prepareImportAll(client) {
    return new Promise((resolve, reject) => {
      EventGetters.selectAll(client).then((eventResponce) => {
        let events = eventResponce.rows
        const eventPrms = events.map((_, evind) => {
          return new Promise((resEv, rejEv) => {
            PersonGetters.getEventPersons(client, events[evind].id).then(
              (personResponce) => {
                let persons = personResponce.rows
                events[evind].persons = persons
                const personPrms = persons.map((_, persind) => {
                  return new Promise((resPers, rejPers) => {
                    persons[persind].telephones = []
                    TelephoneGetters.getPersonTelephones(
                      client,
                      persons[persind].id
                    ).then((telephones) => {
                      persons[persind].telephones = telephones
                      resPers(persons[persind])
                    })
                  })
                })
                Promise.all(personPrms).then((persons) => {
                  events[evind].persons = persons
                  resEv(events[evind])
                })
              }
            )
          })
        })
        Promise.all(eventPrms).then((events) => {
          resolve(events)
        })
      })
    })
  }

  prepareImportData(eventIds) {}
}

module.exports = {
  CryptoManager,
}
