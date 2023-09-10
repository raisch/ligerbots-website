/**
 * This is the main entry point for the web server.
 *
 * It provides two services:
 * - A public service on port 3000 to serve incoming requests from the Internet.
 * - A private API service on port 3001 to serve data from the database.
 *
 * @module
 */
const { _, mongoose } = require('./lib/utils')
const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const routes = require('./routes')

const { API_VERSION, SERVICE_PORT, MONGODB_URI } = require('./etc/constants')

const PORT = process.env.PORT || SERVICE_PORT

const app = express()

console.log('starting up...')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(bodyParser.json())

// add routers
_.keys(routes).forEach(key => {
  console.log(`adding routes for ${key}`)
  if (key === 'main') {
    app.use(routes[key])
  } else {
    app.use(`/api/v${API_VERSION}/${key}`, routes[key])
  }
})

// allow service of static assets (under './public')
app.use(express.static('public'))

// start listening for incoming requests
app.listen(PORT, err => {
  if (err) {
    console.log(`failed to start service: ${err}`)
    process.exit(-1)
  }

  console.log('connecting to mongo...')

  // connect to backend database
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useCreateIndex: true
    })
    .catch(err => {
      console.error(`failed to connect to mongoose: ${err}`)
      process.exit(-1)
    })
    .then(() => console.log('...connected to mongo via mongoose...'))

    .then(() => {
      console.log(`...listening for requests on port ${PORT}`)
    })
})
