/** @module */

// const userId = '65086de0d098bb991b21cf4f'

const mongoose = require('mongoose')

const { croakFactory, dbConnect, stringify } = require('../lib/utils')
const { User } = require('../models/User')

const run = async (func) => {
  dbConnect()
    .catch(croakFactory('failed to connect to mongo'))
    .then(func)
    .catch(croakFactory('failed to run func'))
    .then(() => {
      setTimeout(() => {
        mongoose.disconnect()
        process.exit(0)
      }, 1000)
    })
}

run(async () => {
  const user = await User.findBySlug('raisch-rob')
  console.log(stringify(user, null, 2))
})
