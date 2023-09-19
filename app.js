/* eslint-disable no-unused-vars */
/**
 * This is the main entry point for the web server.
 *
 * It provides two services:
 * - A public service on port 3000 to serve incoming requests from the Internet.
 * - A private API service on port 3001 to serve data from the database.
 *
 * @module
 */

// preferred order of requires
//   node modules,
//   external modules,
//   our own modules
//
// then define constants and variables
const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const ShortUniqueId = require('short-unique-id')

const { _, croak, croakFactory, dbConnect, stringify } = require('./lib/utils')
const routes = require('./routes')

const { API_VERSION, SERVICE_PORT } = require('./etc/constants')

const PORT = process.env.PORT || SERVICE_PORT

const app = express()

/**
 * Extend router response arg with a new templated renderPage function.
 *
 * @example
 * router.get('/path/:page_name', async (req, res) => {
 *    const page = req.param.page_name
 *    res.renderPage(page, `This is the ${page} page.`)
 * })
 */
app.response.renderPage = function (page, title, tmpl = 'template') {
  return this.render(tmpl, {
    title: title || '',
    page: page || 'example'
  })
}

const uid = new ShortUniqueId({ length: 5 })

console.log('starting up...')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(bodyParser.json())

// request/response logging middleware
app.use((req, res, next) => {
  const id = uid.rnd()
  const { method, url } = req
  console.log(`${id} <<< ${method} ${url} ${_.get(req, 'headers.host', 'UNKNOWN')}`)
  res.on('finish', () => {
    console.log(`${id} >>> ${res.statusCode} ${res.statusMessage}  [${res._contentLength.toLocaleString()} octets] ${method} ${url}`)
  })
  next()
})

// add routes
console.log('adding main routes')
app.use(routes.main)

_.keys(routes).forEach(key => {
  if (key !== 'main') {
    console.log(`adding templated routes for ${key}`)
    app.use(`/${key}`, routes[key])

    console.log(`adding api routes for ${key}`)
    app.use(`/api/v${API_VERSION}/${key}`, routes[key])
  }
})

// allow service of static assets (under './public')
app.use(express.static('public'))

app.get('*', async (req, res) => {
  res.status(404).render('main/error')
})

// start listening for incoming requests
app.listen(PORT, err => {
  if (err) {
    croak(`failed to start service: ${err}`)
  }

  console.log('connecting to mongo...')
  dbConnect()
    .catch(croakFactory('failed to connect to mongoose'))
    .then(() => console.log('...connected to mongo via mongoose...'))
    .then(() => console.log(`...listening for requests on port ${PORT}`))
})
