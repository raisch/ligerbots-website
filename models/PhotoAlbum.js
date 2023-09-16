/**
 * @module PhotoAlbum model
 */

const { mongoose } = require('../lib/utils')

const { PhotoSchema } = require('./Photo')

/**
 * Schemas and Models for Photo Albums
 *
 * @type {PhotoAlbumSchema}
 * @property {Boolean} active - if true, this albumn is active
 * @property {String} year - year of this album
 * @property {Date} createdAt - date album was created
 * @property {Date} updatedAt - date album was last updated
 * @property {Photo[]} photos - array of photos in this album
 */
const PhotoAlbumSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true,
      required: true
    },
    year: {
      type: String,
      validate: {
        validator: v => /^\d{4}$/.test(v),
        message: 'Year must be a 4 digit number'
      },
      required: true
    },
    event_name: {
      type: String,
      required: true
    },
    event_date: {
      type: Date
    },
    photos: [PhotoSchema],
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

PhotoAlbumSchema.statics.findByYear = function (year) {
  return this.find({ year })
}

module.exports = {
  PhotoAlbum: mongoose.model('PhotoAlbum', PhotoAlbumSchema),
  PhotoAlbumSchema
}

/**
 * PhotoAlbum Schema
 * @typedef {Object} PhotoAlbumSchema
 */

/**
 * PhotoAlbum model
 * @typedef {Object} PhotoAlbumModel
 */
