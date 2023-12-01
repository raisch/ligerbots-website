/* eslint-disable camelcase, no-unused-vars */
/** @module */

const express = require('express')
const { User } = require('../models/User')

const router = express.Router()
//TODO
/*
filter value and filter will be taken from the page and then the data will be sent back 
I have no idea how im going to do this but here is a basic route to get started
if filterValue is ommited it will render every user 
if filter is does not get a value it does nothing 
if it does it will filter the users based off of the filter value and the filter 
*/
router.get('/', async(req, res) => {
  var users = user.find{filterValue: "filter"}//i dont know how i should get these values in 
  res.render('users/directory', { users })
})

router.get('/new', (req, res) => {
  res.render('users/new', { User: new User() })
})

router.get('/edit/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.render('users/edit', { user })
})

router.post(
  '/',
  async (req, res, next) => {
    req.user = new User()
    next()
  },
  saveUserAndRedirect('new')
)

router.put(
  '/:id',
  async (req, res, next) => {
    req.user = await User.findById(req.params.id)
    next()
  },
  saveUserAndRedirect('edit')
)

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveUserAndRedirect (path) {
  return async (req, res) => {
    let user = req.user
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.imageUrl = req.body.imageUrl
    user.grade = req.body.grade
    try {
      user = await User.save()
      res.redirect(`/users/${user.slug}`)
    } catch (err) {
      console.error(err)
      res.render(`users/${path}`, { user })
    }
  }
}

module.exports = router
