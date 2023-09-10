/** @module */

const { mongoose } = require('../lib/utils')

const { PhotoSchema } = require('./Photo')

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
        validator: v => /^\d{4}$/
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

module.exports = {
  PhotoAlbum: mongoose.model('PhotoAlbum', PhotoAlbumSchema),
  PhotoAlbumSchema
}
