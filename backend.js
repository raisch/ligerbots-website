/**
 * @module
 */

const http = require('node:http')
const _ = require('lodash')
const express = require('express')
const mongoose = require('mongoose')
// const methodOverride = require('method-override')
// const bodyParser = require('body-parser')
// const stringify = require('json-stringify-safe')

const routes = require('./routes')

// routers
// const mainRouter = require('./routes/main')
// const articlesRouter = require('./routes/articles')
// const albumsRouter = require('./routes/albums')
// const studentsRouter = require('./routes/students')

const API_VERSION = 1
const SERVICE_PORT = 3000
const MONGODB_URI = 'mongodb://localhost/blog'

console.log('starting up...')

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true
  })
  .then(() => console.log('connected to mongoose...'))
  .catch(err => {
    console.error(`failed to connect to mongoose: ${err}`)
    process.exit(-1)
  })

// app.use(express.urlencoded({ extended: false }))
// app.use(methodOverride('_method'))
// app.use(bodyParser.json())

const app = express()

// add routers
_.keys(routes).forEach(key => {
  console.log(`adding routes for ${key}`)
  app.use(`/api/v${API_VERSION}/${key}`, routes[key])
})

app.use(express.static('public'))

http.createServer(app).listen(process.env.PORT || SERVICE_PORT)
