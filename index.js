const { ConnectionManager } = require("./pg.connection.service")

const { CryptoManager } = require("./Crypto/cryptoManager")

const { EventGetters } = require("./DB/Event/getters")
const { EventSetters } = require("./DB/Event/setters")

const { PersonGetters } = require("./DB/Person/getters")
const { PersonSetters } = require("./DB/Person/setters")

const { TelephoneGetters } = require("./DB/Telephone/getters")
const { ContactGetters } = require("./DB/Contact/getters")

const { SearchManager } = require("./Search/search")

const path = require("path")
const cors = require("cors")
const asyncHandler = require("express-async-handler")
const bodyParser = require("body-parser")
const express = require("express")

const app = express()
const router = express.Router()
const port = 3003
const allowedOrigins = ["http://localhost:4200", "http://localhost:3000", "http://localhost:3003"]

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true)
      }

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin."
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
  })
)
app.use(
  bodyParser.json({
    limit: "50mb",
  })
)

app.use(express.static(path.resolve(__dirname, "node_modules")))
app.use(express.static(path.resolve(__dirname, "dist", "AngularApp")))

let connectionManager
let cryptoManager

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    connectionManager = new ConnectionManager()
    connectionManager.login(req.body).then((err) => {
      if (err)
        res.status(400).send({
          isLogged: false,
          msg: "Login error",
        })
      else {
        cryptoManager = new CryptoManager()
        cryptoManager
          .generateKey(connectionManager.getClient())
          .then((resolved) => {
            res.status(200).send({
              isLogged: true,
              msg: "You are logged in",
              uuid: resolved,
            })
          })
      }
    })
  })
)

router.get(
  "/get_all_events",
  asyncHandler(async (req, res) => {
    dbLayer(EventGetters.selectAll)
      .then((dbResponce) => {
        const { rows } = dbResponce
        res.send(cryptoManager.encode({ rows }))
      })
      .catch((e) => console.log(`app.get('/get_all_events') ERROR`, e))
  })
)

router.post(
  "/get_event_persons",
  asyncHandler(async (req, res) => {
    dbLayer(
      PersonGetters.getEventPersons,
      cryptoManager.decode(req.body).eventId
    )
      .then((dbResponce) => {
        const { rows } = dbResponce
        res.send(cryptoManager.encode({ rows }))
      })
      .catch((e) => console.log(`app.post('/get_event_persons') ERROR`, e))
  })
)

router.post(
  "/get_person_telephones",
  asyncHandler(async (req, res) => {
    dbLayer(
      TelephoneGetters.getPersonTelephones,
      cryptoManager.decode(req.body).personId
    )
      .then((rows) => {
        res.send(cryptoManager.encode({ rows }))
      })
      .catch((e) => console.log(`app.post('/get_person_telephones') ERROR`, e))
  })
)

router.post(
  "/get_telephone_contacts",
  asyncHandler(async (req, res) => {
    dbLayer(
      ContactGetters.getTelephoneContacts,
      cryptoManager.decode(req.body).telephoneId
    )
      .then((dbResponce) => {
        const { rows } = dbResponce
        res.send(cryptoManager.encode({ rows }))
      })
      .catch((e) => console.log(`app.post('/get_telephone_contacts') ERROR`, e))
  })
)

router.post(
  "/set_update_person",
  asyncHandler(async (req, res) => {
    dbLayer(PersonSetters.setPersonData, cryptoManager.decode(req.body).person)
      .then((responce) => {
        res.send(cryptoManager.encode({ responce }))
      })
      .catch((e) => console.log(`app.post('/set_update_person') ERROR`, e))
  })
)

router.post(
  "/set_add_event",
  asyncHandler(async (req, res) => {
    dbLayer(EventSetters.setEventData, cryptoManager.decode(req.body).event)
      .then((responce) => {
        res.send(cryptoManager.encode({ responce }))
      })
      .catch((e) => console.log(`app.post('/set_add_event') ERROR`, e))
  })
)

router.post(
  "/set_remove_event",
  asyncHandler(async (req, res) => {
    dbLayer(EventSetters.setRemoveEvent, cryptoManager.decode(req.body).event)
      .then((responce) => {
        res.send(cryptoManager.encode({ responce }))
      })
      .catch((e) => console.log(`app.post('/set_remove_event') ERROR`, e))
  })
)

router.post(
  "/set_update_event",
  asyncHandler(async (req, res) => {
    dbLayer(EventSetters.setEventData, cryptoManager.decode(req.body).event)
      .then((responce) => {
        res.send(cryptoManager.encode({ responce }))
      })
      .catch((e) => console.log(`app.post('/set_update_event') ERROR`, e))
  })
)

router.post(
  "/crypto_service",
  asyncHandler(async (req, res) => {
    cryptoManager
      .handleRequest(req.body.code, connectionManager.getClient())
      .then((resolved) => res.send({ resolved }))
  })
)

router.post(
  "/import_events",
  asyncHandler(async (req, res) => {
    cryptoManager
      .importManager(
        cryptoManager.decode(req.body).importData,
        connectionManager.getClient()
      )
      .then((encodedData) => {
        res.set("Access-Control-Allow-Origin", "*")
        res.set("Access-Control-Allow-Headers", "Content-Type")
        res.send(encodedData)
      })
  })
)

router.post(
  "/export_events",
  asyncHandler(async (req, res) => {
    cryptoManager
      .exportManager(req.body.exportData, connectionManager.getClient())
      .then((responce) => res.send(responce))
  })
)

router.post(
  "/search",
  asyncHandler(async (req, res) => {
    SearchManager.searchInDB(
      connectionManager.getClient(),
      cryptoManager.decode(req.body.search)
    ).then((rows) => {
      res.send(cryptoManager.encode({ rows }))
    })
  })
)

//EXPRESS CONFIG
app.use("/api", router)
app.use("/api", function (error, req, res, next) {
  res.status(200).json({
    error,
  })
})

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "AngularApp", "index.html"))
})

// app.use(router)
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

//Слой обертки функций запросов в БД
const dbLayer = (func, ...params) =>
  func(connectionManager.getClient(), ...params)
