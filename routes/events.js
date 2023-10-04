/* eslint-disable camelcase, no-unused-vars */
/** @module */

/*
GET /events => returns all events
GET /events/:event_id => returns a single event

GET /events?year=:year => returns a list of all events for a year
GET /events?slug=:slug => returns a specific event by slug

POST /events => create new event
UPDATE /events/:event_id => update an existing event
DELETE /events/:event_id => delete an existing event
*/

const debug = require('debug')('lib/albums')
const { _ } = require('../lib/utils')

const express = require('express')

const { PhotoAlbum } = require('../models/PhotoAlbum')

const router = express.Router()

router.get('/', async (req, res) => {
  const year = (new Date).getFullYear()
  res.redirect(301, `/event/${year}`)
})

router.get('/:year', async (req, res) => {
  const year = req.params.year;
  const events = await PhotoAlbum.find({ year }).exec()
  res.render('events/list', {
    events
  })
})

router.get('/:event_id', async (req, res) => {
})


module.exports = router
