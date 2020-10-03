const aesjs = require('aes-js')
const { statusCode } = require('../crypto.codes')

class CryptoManager {
    aes
    constructor() {
    }

    generateKey(client) {
        return new Promise((resolve, reject) => {
            client.query(`SELECT uuid_generate_v1()`)
                .then(dbResponce => {
                    const { rows } = dbResponce
                    const uuid = rows[0].uuid_generate_v1
                    this.setKey(uuid)
                    resolve(uuid)
                })
        })
    }

    handleRequest(requestFromClient, client) {
        return new Promise((resolve, reject) => {
            switch (requestFromClient) {
                case statusCode.keyIsUpdated:
                    break
                case statusCode.updateKey:
                    this.generateKey(client)
                        .then(uuid => resolve({ uuid }))
                    break

            }
        })
    }

    setKey(uuid) {
        const slicedKey = uuid.slice(3, 8) + uuid.slice(24, -1)
        this.aes = new aesjs.AES(this.passwordToArrayHandler(slicedKey))   //Have setted key to encoder
    }

    encode(data, password = undefined) {
        const data_string = JSON.stringify(data)
        let data_array = Array.from(aesjs.utils.utf8.toBytes(data_string))

        data_array = this.arraySizeHandler(data_array)
        let encoding_Result = []
        for (let i = 1; i <= (data_array.length / 16); i++) {
            const batch = data_array.slice(((i - 1) * 16), (i * 16))
            const encryptedBytes = this.aes.encrypt(batch)
            encoding_Result = encoding_Result.concat([...encryptedBytes])
        }
        return encoding_Result
    }

    decode(data, password = undefined) {
        const isPasswordRight = (data, aes) => {
            const batch = data.slice(0, 16)
            const encryptedBytes = aes.decrypt(batch)
            if (encryptedBytes[0] !== 123 // char {
                && encryptedBytes[0] !== 91 // char [
            ) {
                return false
            }
            return true
        }

        data = this.arraySizeHandler(data)

        if (isPasswordRight(data, this.aes)) {
            let decodingResult = []
            for (let i = 1; i <= (data.length / 16); i++) {
                const batch = data.slice(((i - 1) * 16), (i * 16))
                const encryptedBytes = this.aes.decrypt(batch)
                decodingResult = decodingResult.concat([...encryptedBytes])
            }
            let strResult = (aesjs.utils.utf8.fromBytes(decodingResult)).replace(/\0/g, '')
            let res = JSON.parse(strResult)
            return res
        }
        else return 'Error: Password is wrong'
    }

    arraySizeHandler(data_array) {
        if (data_array.length % 16 !== 0) {
            const lengthOfZeros = ((~~(data_array.length / 16)) + 1) * 16 - data_array.length
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
}

module.exports = {
    CryptoManager
}