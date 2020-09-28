const { Client } = require('pg')

class ConnectionManager {
    client
    constructor(){
    }

    login = async ( loginParams ) => {
        this.client = new Client(loginParams)
        return this.client.connect()
    }

    logout = () => {
        this.client.end()
    }

    getClient = () => this.client
}

module.exports = {
    ConnectionManager
}