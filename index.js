const {ConnectionManager} = require('./pg.connection.service')
const {EventGetters} = require('./DB/Event/getters')

const express = require('express')
const app = express()
const port = 3000

let connectionManager

app.get('/', (req, res) => {
    connectionManager = new ConnectionManager()
    connectionManager.login('asd')
    res.send(200)
})

app.get('/asd', (req, res) => {
    console.log( dbLayer(EventGetters.selectAll) )
    res.send(200)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const dbLayer = (func) => func(connectionManager.getClient())
