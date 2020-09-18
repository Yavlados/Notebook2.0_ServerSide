const {ConnectionManager} = require('./pg.connection.service')
const {EventGetters} = require('./DB/Event/getters')
const Router = require('express-promise-router')
const cors  = require("cors")
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
// const router = new Router()
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

app.post('/login', asyncHandler(async (req, res) => {
    connectionManager = new ConnectionManager()
    connectionManager.login(req.body).then( (err) => {
        if(err) 
            res.status(400).send(   {
                 isLogged:false,
                 msg:'Login error'
                })
        else {
            res.status(200).send({
                isLogged:true,
                msg:'You are logged in'})
        }
    })
}))

app.get('/main/get_all_events',asyncHandler(async (req, res) => {
    dbLayer(EventGetters.selectAll).then( (dbResponce) => {
        const {rows} = dbResponce
        res.send(rows)
    }).catch( (e) => console.log(e))
})
)

app.get('/qwe', asyncHandler(async (req, res) => {
    dbLayer(EventGetters.searchById, 1).then( (dbResponce) => {
        console.log(dbResponce.rows)
        res.send(dbResponce.rows)
    }).catch( (e) => console.log(e))
})
)

// app.use(router)
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

//Слой обертки функций запросов в БД
const dbLayer = (func, ...params) => func(connectionManager.getClient(), ...params)
