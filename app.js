const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const Student = require('./models/student')
const articleRouter = require('./routes/articles')
const studentsRouter = require('./routes/students')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('main/home', { articles})
})

app.use('/articles', articleRouter)
app.use('/students', studentsRouter)

app.listen(process.env.PORT || 3000)
