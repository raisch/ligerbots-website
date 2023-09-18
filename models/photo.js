/** @module */

const { mongoose } = require('../lib/utils')

/**
 * Photo Schema
 *
 * @typedef {Object} Photo
 *
 * @property {MongoId} _id - autogenerated
 * @property {String} caption
 * @property {String} placement='below'
 * @property {String} location_uri
 * @property {String} createdBy
 * @property {String} updatedBy
 * @property {Date} createdAt - autogenerated
 * @property {Date} updatedAt - autogenerated
 *
 * @example
 * {
 *    caption: 'Blue Goo',
 *    placement: 'below',
 *    location_uri: 'https://farm66.staticflickr.com/65535/53060567875_c492264465_z.jpg',
 *    createdBy: 'unknown',
 *    updatedBy: 'unknown',
 *    _id: ObjectId("6508ccdd6e95f8e23d07a6c2"),
 *    createdAt: ISODate("2023-09-18T22:19:09.467Z"),
 *    updatedAt: ISODate("2023-09-18T22:19:09.467Z")
 * }
 */
const PhotoSchema = new mongoose.Schema(
  {
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

/**
 * PhotoAlbum model
 * @typedef {Object} PhotoModel
 */

module.exports = {
  /** @type {MongooseModel} */
  Photo: mongoose.model('Photo', PhotoSchema),
  /** @type {Photo} */
  PhotoSchema
}
