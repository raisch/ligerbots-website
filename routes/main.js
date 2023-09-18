/* eslint-disable camelcase */
/** @module */

const express = require('express')

const router = express.Router()

// HOMEPAGE
router.get('/', async (req, res) => {
  res.render('main/home')
})

// JOIN PAGE
router.get('/join', (req, res) => {
  console.log('main route for /join')
  console.log('...rendering /join')
  res.render('main/join')
})

module.exports = router
