// Photo Model

const mongoose = require('mongoose')

const PhotoSchema = new mongoose.Schema({
  /* captions can be displayed with a photo */
  caption: {
    type: String,
    required: false
  },
  /* caption_placement can be 'above' or 'below */
  placement: {
    type: String,
    default: 'below',
    enum: {
      values: ['above', 'below'],
      message: 'must be one of "above" or "below"'
    }
  },
  location_uri: {
    type: String,
    required: [true, 'Photo must have a location_uri'],
    validate: {
      validator: v => /^https:\/\/.+\.staticflickr\.com/
      // DANGER! Assumes ALL photos live at flickr.
    }
  }
})

module.exports = { Photo: mongoose.model('Photo', PhotoSchema), PhotoSchema }
