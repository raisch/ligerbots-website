/* eslint-disable camelcase */
/**
 * @module
 */

const string = require('nodash/lib/string')
const { _, mongoose, slugify } = require('../lib/utils')

const { PhotoSchema } = require('./Photo')

/**
 * List of Photos in an Album
 *
 * @typedef {Array.<PhotoSchema>} ListOfPhotos
 */

/** @type {ListOfPhotos} */
const ListOfPhotos = [PhotoSchema]

/**
 * @typedef {Object} PhotoAlbum
 *
 * @property {Boolean} active - if true, this albumn is active
 * @property {String} year - year of this album
 * @property {String} event_name - name of the event
 * @property {String} event_date - date of the event as YYYY-MM-DD
 * @property {String} event_slug - autogenerated from event_name + '-' + event_date
 * @property {ListOfPhotos} photos - array of photos in this album
 * @property {String} createdBy
 * @property {String} updatedBy
 * @property {Date} createdAt - autogenerated
 * @property {Date} updatedAt - autogenerated
 *
 * @example
 * {
 *    _id: ObjectId("65086de0d098bb991b21cf49"),
 *    active: true,
 *    year: '2023',
 *    event_name: 'Still Another Big Event',
 *    event_date: '2022-10-1',
 *    event_slug: 'still-another-big-event-2022-10-1',
 *    photos: [
 *      {
 *        caption: 'With Pringles',
 *        placement: 'below',
 *        location_uri: 'https://farm66.staticflickr.com/65535/53060663853_22d9597791_z.jpg',
 *        createdBy: 'unknown',
 *        updatedBy: 'unknown',
 *        _id: ObjectId("65086de0d098bb991b21cf4a"),
 *        createdAt: ISODate("2023-09-18T15:33:52.030Z"),
 *        updatedAt: ISODate("2023-09-18T15:33:52.030Z")
 *      }
 *    ],
 *    createdBy: 'unknown',
 *    updatedBy: 'unknown',
 *    createdAt: ISODate("2023-09-18T15:33:52.030Z"),
 *    updatedAt: ISODate("2023-09-18T15:33:52.030Z")
 * }
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
        message: 'must be a 4 digit number'
      },
      required: true
    },
    event: {
      name: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
        required: true
      },
      date: {
        type: String,
        validate: {
          validator: v => /^\d{4}-\d{2}-\d{2}$/.test(v),
          message: 'must be in the form yyyy-mm-dd'
        },
        required: true
      },
      slug: { // autogenerated
        type: String,
        required: true
      }
    },
    // event_name: {
    //   type: String,
    //   required: true
    // },
    // event_date: {
    //   type: String,
    //   validate: {
    //     validator: v => /^\d{4}-\d{2}-\d{2}$/.test(v),
    //     message: 'must be in the form yyyy-mm-dd'
    //   },
    //   required: true
    // },
    // event_slug: { // autogenerated
    //   type: String,
    //   required: true
    // },
    photos: ListOfPhotos,
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

_.merge(PhotoAlbumSchema.statics, {
  /**
   * Find a photo albums by year.
   *
   * @param {String} year
   * @returns {Array.<PhotoAlbum|undefined>}
   */
  findByYear: year => this.find({ year }),
  /**
   * Find a photo album by event name.
   *
   * @param {String} event_name
   * @returns {Array.<PhotoAlbum|undefined>}
   */
  findByEventName: event_name => this.find({ event: { name: event_name } })
})

PhotoAlbumSchema.pre('validate', function (next) {
  this.event.slug = slugify(`${this.event.name}-${this.event.date}`, { lower: true, strict: true })
  next()
})

module.exports = {
  /** @type {MongooseModel} */
  PhotoAlbum: mongoose.model('PhotoAlbum', PhotoAlbumSchema),
  /** @type {MongooseSchema} */
  PhotoAlbumSchema
}
