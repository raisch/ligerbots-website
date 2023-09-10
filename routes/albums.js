/* eslint-disable camelcase */
/** @module */

const debug = require('debug')('lib/albums')

const _ = require('lodash')
const express = require('express')

const { PhotoAlbum } = require('../models/PhotoAlbum')

/* Photo Album Record Example
  {
    active: true,
    year: "2023",
    event_name: "some event",
    event_date: "2023-09-08T18:55:15.430Z",
    photos: [
      {
        caption: "a pretty photo",
        placement: "below",
        location_uri: "https://something.staticflickr.com/...",
        createdBy: "unknown",
        updatedBy: "unknown",
        createdAt: "2023-09-08T18:55:15.430Z",
        updatedAt: "2023-09-08T18:55:15.430Z"
      }, {
        ...
      }
    ],
    createdBy: "unknown",
    updatedBy: "unknown",
    createdAt: "2023-09-08T18:55:15.430Z",
    updatedAt: "2023-09-08T18:55:15.430Z"
  }
*/

const router = express.Router()

/*
GET /albums => returns a list of years
GET /albums/:year/events => returns a list of events
GET /albums/:year/events/:event_id => returns a list of photos for an event

POST /albums => create a new album
PUT /albums/:album_id => update an existing album
DELETE /albums/:album_id => delete an existing album
*/

/**
 * Handler for default /albums route
 *
 * @param   {Request}  req
 * @param   {Response}  res
 *
 * @return  {void}
 *
 * @example
 * GET /api/v1/albums?filter=
 */
router.get('/', async (req, res) => {
  // route /albums?filter=[year,...]

  const projection = req.query?.filter ? req.query.filter.split(',') : ['year']

  const recs = await PhotoAlbum.find({}, projection) // returns [ { _id: '', year: '2023' }, ... ]

  debug('recs in /albums: %0', recs)

  const years = _.sortedUniq(
    _.map(recs, rec => rec.year) // [ '2023', '2022', '2023', ... ]
      .sort((a, b) => a - b)
  ) // returns [ 2022, 2023 ]

  res.render('albums/year_list', {
    years,
    title: 'Photo Albums by Year'
  })
})

/**
 * Handler for /albums/:year/events route
 *
 * @param   {Request}  req
 * @param   {Response}  res
 *
 * @return  {void}
 */
router.get('/:year/events', async (req, res) => {
  // route /albums/:year/events
  // display a list of events for a year
  const year = req.params.year
  const events = await PhotoAlbum.find({ year }, ['event_name', 'event_date'])
  res.render('albums/event_list', {
    events,
    year,
    title: `Events for ${year}`,
    fmt: e => {
      // formatting helper function
      return {
        anchor: `/photos/${year}/${e.event_name}`,
        label: `${e.event_date}: ${e.event_name}`
      }
    }
  })
})

module.exports = router
