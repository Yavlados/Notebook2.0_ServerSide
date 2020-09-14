const {ConnectionManager} = require('./pg.connection.service')

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
    // pgService.selectAll()
    // res.send(200)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
