const {ConnectionManager} = require('./pg.connection.service')
const {EventGetters} = require('./DB/Event/getters')
const cors  = require("cors")
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const port = 3000
const allowedOrigins = [
    "http://localhost:4200"
]

app.use(cors({
    origin(origin, callback) {
        if (!origin) { return callback(null, true) }

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = "The CORS policy for this site does not allow access from the specified Origin."
            return callback(new Error(msg), false)
          }
        return callback(null, true)
    },
}))
app.use(bodyParser.json({limit: '50mb'}))


let connectionManager

app.post('/login', (req, res) => {
    console.log(req.body)
    connectionManager = new ConnectionManager()
    const loginState = connectionManager.login(req.body)
    if(loginState)  res.sendStatus(200)
    else {
        res.status(400).send('Login error')
    }
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
    console.log(`App listening at http://localhost:${port}`)
})

//Слой обертки функций запросов в БД
const dbLayer = (func, ...params) => func(connectionManager.getClient(), ...params)
