const {ConnectionManager} = require('./pg.connection.service')

const {stateFlag} = require('./flag.dto')

const {EventGetters} = require('./DB/Event/getters')
const {PersonGetters} = require('./DB/Person/getters')
const {TelephoneGetters} = require('./DB/Telephone/getters')
const {ContactGetters} = require('./DB/Contact/getters')

const Router = require('express-promise-router')
const cors  = require("cors")
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const express = require('express')
const { PersonSetters } = require('./DB/Person/setters')

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

//-- MainPage requests --//
app.get('/main/get_all_events',asyncHandler(async (req, res) => {
    dbLayer(EventGetters.selectAll).then( (dbResponce) => {
        const {rows} = dbResponce
        res.send(rows)
    }).catch( (e) => console.log(`app.get('/main/get_all_events')`,e))
})
)

app.post('/main/get_event_persons',asyncHandler(async (req, res) => {
    dbLayer(PersonGetters.getEventPersons, req.body.eventId).then( (dbResponce) => {
        const {rows} = dbResponce
        res.send(rows)
    }).catch( (e) => console.log(`app.post('/main/get_event_persons') ERROR`, e))
})
)

app.post('/main/get_person_telephones', asyncHandler(async (req, res) => {
    dbLayer(TelephoneGetters.getPersonTelephones, req.body.personId ).then( (dbResponce) => {
        const {rows} = dbResponce
        res.send(rows)
    }).catch( (e) => console.log(`app.post('/main/get_person_telephones') ERROR`, e))
})
)

app.post('/main/get_telephone_contacts', asyncHandler(async (req, res) => {
    dbLayer(ContactGetters.getTelephoneContacts, req.body.telephoneId )
    .then( (dbResponce) => {
        const {rows} = dbResponce
        res.send(rows)
    }).catch( (e) => console.log(`app.post('/main/get_telephone_contacts') ERROR`, e))
})
)
//new
app.post('/main/set_update_person', asyncHandler(async (req, res) => {
    dbLayer(PersonSetters.setPersonData, req.body.person)
    // dbLayer(ContactGetters.getTelephoneContacts, req.body.telephoneId )
    // .then( (dbResponce) => {
    //     const {rows} = dbResponce
    //     res.send(rows)
    // }).catch( (e) => console.log(`app.post('/main/get_telephone_contacts') ERROR`, e))
})
)

// app.use(router)
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

//Слой обертки функций запросов в БД
const dbLayer = (func, ...params) => func(connectionManager.getClient(), ...params)
