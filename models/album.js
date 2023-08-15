// Photo Album Model

const mongoose = require('mongoose')

const { PhotoSchema } = require('./photo')

const AlbumSchema = new mongoose.Schema({
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
    type: String
  },
  photos: [PhotoSchema]
})

module.exports = {
  Album: mongoose.model('PhotoAlbum', AlbumSchema),
  AlbumSchema
}
