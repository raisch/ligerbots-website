const mongoose = require('mongoose')
const marked = require('marked').parse
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const StudentDirSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true 
  },
  Image: {
    type: String,
    required: true
  },
  Grade: {
    type: String,
    required: true
  },
  Slug: {
    type: String,
    required: true,
    unique: true
  }
})

ArticleSchema.pre('validate', function (next) {
  if (this.FirstName && this.LastName) {
    this.slug = slugify(this.Firstname + this.LastName, { lower: true, strict: true })
  }
next()

})

module.exports = mongoose.model('students', ArticleSchema)
