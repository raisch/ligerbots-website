const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

// routers
const mainRouter = require('./routes/main')
const articlesRouter = require('./routes/articles')
const photosRouter = require('./routes/photos')
const studentsRouter = require('./routes/students')

const SERVICE_PORT = 3000
const MONGODB_URI = 'mongodb://localhost/blog'

const app = express()

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

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use('/', mainRouter)

app.use('/articles', articlesRouter)
app.use('/photos', photosRouter)
app.use('/students', studentsRouter)

app.use(express.static('public'))

app.listen(process.env.PORT || SERVICE_PORT)
