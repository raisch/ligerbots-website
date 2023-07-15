const mongoose = require('mongoose')
const slugify = require('slugify')
const { JSDOM } = require('jsdom')

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true 
  },
  imageUrl: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
})

StudentSchema.pre('validate', function (next) {
  if (this.firstName && this.lastName) {
    this.slug = slugify(this.Lastname + this.firstName, { lower: true, strict: true })
  } next()
  if (this.grade >= 9 && this.grade <= 12)
next()

})

module.exports = mongoose.model('Student', StudentSchema)
