/* eslint-disable camelcase */
/**
 * @module
 */

// eslint-disable-next-line no-unused-vars
const { _, mongoose, slugify } = require('../lib/utils')

const EventSchema = new mongoose.Schema(
  {
    name: {
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
    slug: {
      // autogenerated
      type: String,
      required: true
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

module.exports = {
  /** @type {MongooseModel} */
  Event: mongoose.model('Event', EventSchema),
  /** @type {MongooseSchema} */
  EventSchema
}
