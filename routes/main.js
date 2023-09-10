/* eslint-disable camelcase */
/** @module */

const express = require('express')

const { Article } = require('../models/Article')

const router = express.Router()

// HOMEPAGE
router.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('main/home', { articles })
})

// JOIN PAGE
router.get('/join', (req, res) => {
  console.log('...rendering /join')
  res.render('main/join')
})

module.exports = router
