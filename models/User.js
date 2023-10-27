/**
 * @module
 */

const { _, mongoose, slugify } = require('../lib/utils')

/** @typedef {UserKind[]} UserKindList */
/** @typedef {('student'|'coach'|'mentor'|'parent'|'other')} UserKind */

/**
 * @type {UserKindList}
 */
const UserKindList = ['student', 'coach', 'mentor', 'parent', 'other']

/**
 * @typedef {Object} User
 *
 * @property {MongoId} _id - autogenerated
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} imageUrl
 * @property {UserKind} kind
 * @property {Number} grade
 * @property {String} slug - autogenerated identifier
 * @property {String} createdBy
 * @property {String} updatedBy
 * @property {Date} createdAt - autogenerated
 * @property {Date} updatedAt - autogenerated
 *
 * @example
 *  {
 *    _id: '.....', // autogenerated
 *    firstName: "John",
 *    lastName: "User",
 *    imageUrl: "http://...",
 *    kind: "student", // enum from Kind
 *    grade: 10,
 *    phone: "853-345-3245",
 *    email: "john@example.com",
 *    address: "123 Main St",
 *    school: "newton north",
 *    slug: "john-user", // auto-generated
 *    createdBy: "unknown",
 *    updatedBy: "unknown",
 *    createdAt: "2023-09-08T18:55:15.430Z",
 *    updatedAt: "2023-09-08T18:55:15.430Z"
 *  }
 */

/** @type {MongooseSchema} */
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
      enum: {
        values: UserKindList,
        message: `must be one of ${JSON.stringify(UserKindList)}`
      },
      required: true
    },
    grade: {
      type: Number,
      required: true
    },
    phone: {
      type: String,
      validator: (v) => /^\d{3}-\d{3}-\d{4}$/.test(v)
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      validator: (v) => /(\d+)*(\s)*(\w+)*(\s)*(\w+)*(\s)*(\w+)/gm.test(v),
      required: true
    },
    school: {
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

UserSchema.pre('validate', function (next) {
  this.slug = this?.slug ||
      slugify(`${this.lastName}-${this.firstName}`, {
        lower: true,
        strict: true
      })
  if (this.kind === 'student' && !_.isHighSchoolGrade(this)) {
    next(new Error('student must be in grades 9-12'))
    return
  }

  next()
})

_.merge(UserSchema.statics, {
  /**
   * Get all user slugs.
   *
   * @returns {Array.<String>}
   */
  getAllSlugs: async function () {
    const users = await this.find({}, 'slug')
    return users.map(user => user.slug)
  },
  findBySlug: async function (slug) {
    const result = await this.find({ slug })
    if (result.length > 1) {
      throw new Error(`found more than one user for slug "${slug}"`)
    }
    return result.shift()
  },
  findByFullName: async function (firstName, lastName) {
    const result = await this.findOne({ firstName, lastName })
    return result.shift()
  },
  deleteBySlug: async function (slug) {
    const result = await this.findBySlug(slug)
    const user = result.shift()
    if (!_.isNonEmptyObject(user)) {
      throw new Error(`failed to find user with slug "${slug}"`)
    }
    return this.deleteOne({ _id: user._id })
  }
})

module.exports = {
  /** @type {MongooseModel} */
  User: mongoose.model('User', UserSchema),
  /** @type {MongooseSchema} */
  UserSchema,
  /** @type {UserKindList} */
  UserKindList
}
