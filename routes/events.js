/* eslint-disable camelcase, no-unused-vars */
/** @module */

/*
GET /events => returns all events
GET /events/:event_id => returns a single event

POST /events => create new event
PUT /events/:event_id => update an existing event
DELETE /events/:event_id => delete an existing event
*/

const debug = require('debug')('lib/albums')
const { _ } = require('../lib/utils')

const express = require('express')

const { PhotoAlbum } = require('../models/PhotoAlbum')

const router = express.Router()

router.get('/', async (req, res) => { // return create event view
  res.render('events/edit', { event: new Event() })
})

router.get('/:event_id', async (req, res) => { // return update event view
  const event_id = await PhotoAlbum.findById(req.params.event_id)
  res.render('events/edit', { event_id })
})

router.post('/', async (req, res, next) => {
  req.event = new Event()
  next()
},
saveEventAndRedirect('edit')
)

router.put('/:event_id', async (req, res) => { // update existing event, return success view
  const event_id = await PhotoAlbum.findByIdAndUpdate(req.params.event_id, req.body, { new: true })
  saveEventAndRedirect('edit')
})

router.delete('/:event_id', async (req, res) => { // delete event, return success
  const event_id = await PhotoAlbum.findByIdAndDelete(req.params.event_id)
  res.render('events')
})

function saveEventAndRedirect () {
  return async (req, res) => {
    let event = req.event
    event.active = req.body.active
    event.year = req.body.year
    event.name = req.body.name
    event.date = req.body.date
    try {
      event = await event.save()
      res.redirect(`/events/${event.slug}`)
    } catch (err) {
      console.error(err)
      res.render('events/edit', { event })
    }
  }
}

module.exports = router
