const assert = require('assert')
const mongoose = require('mongoose')

const { DateTime } = require('../lib/model_types')

const BlogPostSchema = mongoose.Schema({
  // _id: ObjectId("6487a9ec3edca6eca91da65c"),
  active: Boolean,
  title: {
    type: String,
    required: true
  },
  imageUrl: String,
  lede: String,
  link: String,
  created: DateTime,
  updated: DateTime
})

module.exports = mongoose.model('BlogPost', BlogPostSchema)

if (process.env.TESTING) {
  const BlogPost = module.exports

  const blogpost = new BlogPost()
  blogpost.title = 'Test Blog Post'
  blogpost.created = '20230613111000'
  // blogpost.updated = '20230613111000'

  const error = blogpost.validateSync()
  if (error) console.log(error.toString())
}
