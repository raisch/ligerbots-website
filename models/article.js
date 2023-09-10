/** @module */

const { mongoose, slugify } = require('../lib/utils')

const marked = require('marked').parse
// const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

/*
{
  "title": "This is an article.",
  "description": "This is a description of the article.",
  "kind": "blogpost",
  "markdown": "# Hello World! \n This is the content of my first blog post.",
  "santizedHtml": "<H1>Hello World!</H1><P>This is the content of my first blog post.</P>",
  "slug": "this-is-an-article",
  "createdAt": "2023-09-08T18:55:15.430Z"
}
*/

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    kind: {
      type: String,
      required: true,
      enum: ['blogpost', 'feature', 'faq', 'other']
    },
    markdown: {
      type: String,
      required: true
    },
    sanitizedHtml: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    createdBy: {
      type: String,
      default: 'unknown'
    },
    updatedBy: {
      type: String,
      default: 'unknown'
    }
  },
  {
    timestamps: true
  }
)

ArticleSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(
      marked(this.markdown, { mangle: false, headerIds: false })
    )
  }
  next()
})

module.exports = {
  Article: mongoose.model('Article', ArticleSchema),
  ArticleSchema
}
