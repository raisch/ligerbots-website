/* eslint-env jest */

const mongoose = require('mongoose')

const { MONGODB_URI } = require('../etc/constants')

const { User } = require('../models/User')

let userId

beforeAll(async () => {
  return mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    // useCreateIndex: true
    })
    .catch(err => {
      console.error(`failed to connect to ${MONGODB_URI}: ${err}`)
      process.exit(-1)
    })
    .then(async () => {
      const user = await User.findOne({})
      userId = user?._id
      console.log(`found user id: ${userId}`)
    })
})

afterAll(async () => {
  mongoose.disconnect()
})

test('returns all slugs', async () => {
  const slugs = await User.getAllSlugs()
  expect(slugs).toEqual(['john-user'])
})

test('returns a user by id', async () => {
  const user = await User.findById(userId)

  expect(user).toBeDefined()
  expect(user?.firstName).toEqual('John')
  expect(user?.lastName).toEqual('User')
})

test('returns a user by slug', async () => {
  const user = await User.findBySlug('john-user')

  expect(user).toBeDefined()
  expect(user?.firstName).toEqual('John')
  expect(user?.lastName).toEqual('User')
})

test('returns a user by full name', async () => {
  const user = await User.findByFullName('John', 'User')

  expect(user).toBeDefined()
  expect(user?.firstName).toEqual('John')
  expect(user?.lastName).toEqual('User')
})
