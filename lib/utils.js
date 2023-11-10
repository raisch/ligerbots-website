/**
 * Utilities of General Usefulness.
 *
 * @module
 */

const util = require('node:util')
const assert = require('node:assert')
const fs = require('node:fs')
const fsp = require('node:fs/promises')

const _ = require('lodash')
const mongoose = require('mongoose')
const slugify = require('slugify')
const stringify = require('json-stringify-safe')

const { NODE_ENV, MONGODB_URI } = require('../etc/constants')

_.mixin({
  isDev: () => NODE_ENV === 'development',
  isNonEmptyString: s => _.isString(s) && !_.isEmpty(s),
  isNonEmptyArray: a => _.isArray(a) && !_.isEmpty(a),
  isNonEmptyObject: o => _.isPlainObject(o) && !_.isEmpty(o),
  isStudentKind: s => _.get(s, 'kind') === 'student',
  isHighSchoolGrade: s =>
    _.isNumber(s?.grade) && (s.grade >= 9 || s.grade <= 12),
  isValidStudent: s => _.isStudentKind(s) && _.isHighSchoolGrade(s)
})

const croak = msg => {
  console.error(msg)
  process.exit(-1)
}

const dbConnect = async () => {
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true
  })
}

const dbDisconnect = async () => {
  return mongoose.connection.close()
}

const croakFactory = (msg, ...args) => {
  return err => {
    console.error(`${msg}: ${err}`)
    if (_.isNonEmptyArray(args)) {
      console.error(`with args: ${stringify(args)}`)
    }
    process.exit(-1)
  }
}

/**
 * @type {Object}
 *
 * @property {Object} _ - alias for lodash
 * @property {Object} lodash
 * @property {Object} mongoose
 * @property {Object} slugify
 * @property {Object} stringify
 * @property {Object} fs
 * @property {Object} fsp - fs/promises
 * @property {Function} assert
 * @property {Function} croak - fail with a msg
 * @property {Function} dbConnect - connect to db, returns a promise
 * @property {Function} dbDisconnect - disconnects from db, returns a promise
 * @property {Function} croakFactory - returns a function that croaks
 *
 * @exports lib/utils
 */
module.exports = _.merge(util, {
  _,
  lodash: _,
  assert,
  mongoose,
  slugify,
  stringify,
  fs,
  fsp,
  croak,
  dbConnect,
  dbDisconnect,
  croakFactory
})
