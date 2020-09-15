const {ConnectionManager} = require('./pg.connection.service')
const {EventGetters} = require('./DB/Event/getters')

const express = require('express')
const app = express()
const port = 3000

let connectionManager

app.get('/', (req, res) => {
    connectionManager = new ConnectionManager()
    connectionManager.login('asd')
    res.sendStatus(200)
})

app.get('/asd', async (req, res) => {
    dbLayer(EventGetters.selectAll).then( (dbResponce) => {
        console.log(dbResponce.rows)
        res.send(dbResponce.rows)
    }).catch( (e) => console.log(e))
})

app.get('/qwe', async (req, res) => {
    dbLayer(EventGetters.searchById, 1).then( (dbResponce) => {
        console.log(dbResponce.rows)
        res.send(dbResponce.rows)
    }).catch( (e) => console.log(e))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

//Слой обертки функций запросов в БД
const dbLayer = (func, ...params) => func(connectionManager.getClient(), ...params)
