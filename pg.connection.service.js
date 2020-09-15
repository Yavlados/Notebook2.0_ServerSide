const { Client } = require('pg')

class ConnectionManager {
    client
    constructor(){
    }

    login = ( loginParams ) =>  {
        this.client = new Client({
            host: 'localhost',
            port: 5439,
            user: 'postgres',
            database:'postgres'
        })
        this.client.connect(err => {
            if (err) {
                console.error('connection error', err.stack)
            } else {
                console.log('connected')
            }
        })
    }

    logout = () => {
        this.client.end()
    }

    getClient = () => this.client
}

module.exports = {
    ConnectionManager
}