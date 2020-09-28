const {
    ConnectionManager
} = require('./pg.connection.service')

const {
    EventGetters
} = require('./DB/Event/getters')
const {
    EventSetters
} = require('./DB/Event/setters')

const {
    PersonGetters
} = require('./DB/Person/getters')
const {
    PersonSetters
} = require('./DB/Person/setters')

const {
    TelephoneGetters
} = require('./DB/Telephone/getters')
const {
    ContactGetters
} = require('./DB/Contact/getters')

const path = require('path')
const cors = require("cors")
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const express = require('express')


const app = express()
const router = express.Router()
const port = 3000
const allowedOrigins = [
    "http://localhost:4200",
    "http://localhost:3000"
]

app.use(cors({
    origin(origin, callback) {
        if (!origin) {
            return callback(null, true)
        }

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = "The CORS policy for this site does not allow access from the specified Origin."
            return callback(new Error(msg), false)
        }
        return callback(null, true)
    },
}))
app.use(bodyParser.json({
    limit: '50mb'
}))

app.use(express.static(path.resolve(__dirname, 'node_modules')))
app.use(express.static(path.resolve(__dirname, 'dist', 'AngularApp')))

let connectionManager

router.post('/login', asyncHandler(async (req, res) => {
    connectionManager = new ConnectionManager()
    connectionManager.login(req.body).then((err) => {
        if (err)
            res.status(400).send({
                isLogged: false,
                msg: 'Login error'
            })
        else {
            res.status(200).send({
                isLogged: true,
                msg: 'You are logged in'
            })
        }
    })
}))

//-- MainPage requests --//
router.get('/get_all_events', asyncHandler(async (req, res) => {
    dbLayer(EventGetters.selectAll).then((dbResponce) => {
        const {
            rows
        } = dbResponce
        res.send(rows)
    }).catch((e) => console.log(`app.get('/main/get_all_events')`, e))
}))

router.post('/get_event_persons', asyncHandler(async (req, res) => {
    dbLayer(PersonGetters.getEventPersons, req.body.eventId).then((dbResponce) => {
        const {
            rows
        } = dbResponce
        res.send(rows)
    }).catch((e) => console.log(`app.post('/main/get_event_persons') ERROR`, e))
}))

router.post('/get_person_telephones', asyncHandler(async (req, res) => {
    dbLayer(TelephoneGetters.getPersonTelephones, req.body.personId).then((dbResponce) => {
        const {
            rows
        } = dbResponce
        res.send(rows)
    }).catch((e) => console.log(`app.post('/main/get_person_telephones') ERROR`, e))
}))

router.post('/get_telephone_contacts', asyncHandler(async (req, res) => {
    dbLayer(ContactGetters.getTelephoneContacts, req.body.telephoneId)
        .then((dbResponce) => {
            const {
                rows
            } = dbResponce
            res.send(rows)
        }).catch((e) => console.log(`app.post('/main/get_telephone_contacts') ERROR`, e))
}))
//new
router.post('/set_update_person', asyncHandler(async (req, res) => {
    dbLayer(PersonSetters.setPersonData, req.body.person)
}))

router.post('/set_add_event', asyncHandler(async (req, res) => {
    dbLayer(EventSetters.setEventData, req.body.event)
        .then(responce => {
            res.send(responce)
        })
}))

router.post('/set_remove_event', asyncHandler(async (req, res) => {
    dbLayer(EventSetters.setRemoveEvent, req.body.event)
        .then(responce => {
            res.send(responce)
        })
}))
app.use('/api', router)
app.use('/api', function (error, req, res, next) {
    res.status(statusCode).json({
        error
    });
});

app.get('/*', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'dist', 'AngularApp', 'index.html')
    )
})

// app.use(router)
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

//Слой обертки функций запросов в БД
const dbLayer = (func, ...params) => func(connectionManager.getClient(), ...params)