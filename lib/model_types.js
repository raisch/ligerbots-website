
// match digits: YYYYMMDDHHmmSS
const DATETIME_RE = /^\d{4}(\d{2})\d{2}\d{2}\d{2}\d{2}$/

const DateTimeValidator = (val) => {
  return DATETIME_RE.test(val)
}

const DateTime = {
  type: String,
  required: true,
  validate: {
    validator: DateTimeValidator
  }
}

const PHONENUM_RE = /^\(?\)?$/

module.exports = {
  DateTime
}