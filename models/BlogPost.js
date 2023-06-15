const assert = require('assert')
const mongoose = require('mongoose');

// match digits: YYYYMMDDHHmmSS
const DATETIME_RE = /^\d{4}(\d{2})\d{2}\d{2}\d{2}\d{2}$/;

const DateTimeValidator = (val) => {
  return DATETIME_RE.test(val)
}

const DateTime = {
  type: String,
  required: true,
  validate: {
    validator: DateTimeValidator
  }
}

const PHONENUM_RE = /^\(?\)?$/

var BlogPostSchema = mongoose.Schema({
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
  });

const BlogPost = module.exports = mongoose.model("BlogPost", BlogPostSchema);

const blogpost = new BlogPost()
blogpost.title = 'Test Blog Post'
blogpost.created = '20230613111000'
// blogpost.updated = '20230613111000'

let error = blogpost.validateSync()
if (error) console.log(error.toString())



