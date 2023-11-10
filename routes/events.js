/* eslint-disable camelcase, no-unused-vars */
/** @module */

/*
GET /events => returns all events
GET /events/:event_id => returns a single event

POST /events => create new event
PUT /events/:event_id => update an existing event
DELETE /events/:event_id => delete an existing event
*/

const debug = require('debug')('routes/events')

const { _, stringify } = require('../lib/utils')

const express = require('express')

const { Event } = require('../models/Event')

const router = express.Router()

router.get('/', async (req, res) => { // return create event view
  res.render('events/edit', { event: {} })
})

router.get('/:event_id', async (req, res) => { // return update event view
  const event = await Event.findById(req.params.event_id)
  res.render('events/edit', { event })
})

router.post('/', async (req, res) => {
  const data = req.body
  try {
    const event = new Event(data)
    const result = await event.save()
    res.status(201).json({ result })
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ type: 'ValidationError', error: err.message })
      return
    }
    res.status(400).json({ type: 'UnknownError', error: err.message })
  }
})

// TODO - BROKEN fix me
router.put('/:event_id', async (req, res) => {
  console.log('PUT CALLED ON ', req.params.event_id)
  res.sendStatus(200).json({ message: 'YUP IT WORKED!' })
})

// router.post('/', async (req, res, next) => {
//   const data = req.body
//   try {
//     req.event = new Event(data)
//   } catch (err) {
//     if (err.name === 'ValidationError') {
//       res.status(400).json({ type: 'ValidationError', error: err.message })
//       return
//     }
//     res.status(400).json({ type: 'UnknownError', error: err.message })
//     return
//   }
//   next(req, res)
// }, saveEventAndRedirect())

// router.put('/:event_id', async (req, res) => { // update existing event, return success view
//   const event_id = await PhotoAlbum.findByIdAndUpdate(req.params.event_id, req.body, { new: true })
//   saveEventAndRedirect('edit')
// })

// router.delete('/:event_id', async (req, res) => { // delete event, return success
//   const event_id = await PhotoAlbum.findByIdAndDelete(req.params.event_id)
//   res.render('events')
// })

function saveEventAndRedirect () {
  return async (req, res) => {
    let event = req.event
    try {
      event = await event.save()
      res.redirect('/events?SUCCESS')
    } catch (err) {
      console.error(stringify(err))
      res.render('events/edit', { event })
    }
  }
}

module.exports = router
