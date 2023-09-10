/** @module */

const { _, mongoose, slugify } = require('../lib/utils')

/**
 * User Schema
 *
 * @type {MongooseSchema}
 *
 * @example
 *  // Example record
 *
 *  {
 *    firstName: "John",
 *    lastName: "User",
 *    imageUrl: "http://...",
 *    kind: "student",
 *    grade: 10,
 *    slug: "john-user", // auto-generated
 *    createdBy: "unknown",
 *    updatedBy: "unknown",
 *    createdAt: "2023-09-08T18:55:15.430Z",
 *    updatedAt: "2023-09-08T18:55:15.430Z"
 *  }
 */
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    kind: {
      type: String,
      required: true,
      enum: ['student', 'coach', 'mentor', 'parent', 'other']
    },
    grade: {
      type: Number,
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

UserSchema.pre('validate', function (next) {
  if (this.firstName && this.lastName) {
    this.slug =
      this?.slug ||
      slugify(this.Lastname + this.firstName, {
        lower: true,
        strict: true
      })
  }

  if (!_.isValidStudent(this)) {
    next(new Error('not a valid student'))
    return
  }

  next()
})

module.exports = {
  User: mongoose.model('User', UserSchema),
  UserSchema
}
