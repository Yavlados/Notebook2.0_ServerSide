const { Client } = require('pg')

class ConnectionManager {
    client
    constructor(){
    }

    login = async ( loginParams ) =>  {
        this.client = new Client(loginParams)
        let conState
        await this.client.connect(err => {
            if (err) {
                console.error('connection error', err.stack)
                conState = false
            } else {
                console.log('connected')
                conState = true
            }
        })
        return conState
    }

    logout = () => {
        this.client.end()
    }

    getClient = () => this.client
}

module.exports = {
    ConnectionManager
}