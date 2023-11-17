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

})

router.get('/:event_id', async (req, res) => { // return update event view

})

router.post('/', async (req, res) => { // save new event, return success view

})

router.put('/:event_id', async (req, res) => { // update existing event, return success view

})

router.delete('/:event_id', async (req, res) => { // delete event, return success

})

module.exports = router
