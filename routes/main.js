/* eslint-disable camelcase, no-unused-vars */
/** @module */

const { _, assert, fs, stringify } = require('../lib/utils')

const express = require('express')

const router = express.Router()

router.get('/', async (res, req) => {
  res.render('main/home')
})

router.get('/content/:page', async (req, res) => {
  const page = req.params.page
  res.renderPage(page, `Content for ${page}`)
})

module.exports = router
