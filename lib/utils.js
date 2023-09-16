/**
 * Utilities of General Usefulness.
 *
 * @module
 */

const util = require('node:util')
const fs = require('node:fs/promises')

const _ = require('lodash')
const mongoose = require('mongoose')
const slugify = require('slugify')
const stringify = require('json-stringify-safe')

_.mixin({
  isNonEmptyString: s => _.isString(s) && !_.isEmpty(s),
  isNonEmptyArray: a => _.isArray(a) && !_.isEmpty(a),
  isStudentKind: s => s?.kind === 'student',
  isHighSchoolGrade: s => _.isNumber(s?.grade) && (s.grade >= 9 || s.grade <= 12),
  isValidStudent: s => _.isStudentKind(s) && _.isHighSchoolGrade(s)
})

/**
 * @type {Object}
 *
 * @property {Object} _ - alias for lodash
 * @property {Object} lodash
 * @property {Object} mongoose
 * @property {Object} slugify
 * @property {Object} stringify
 * @property {Object} fs
 *
 * @exports lib/utils
 */
module.exports = _.merge(util, {
  _,
  lodash: _,
  mongoose,
  slugify,
  stringify,
  fs
})
