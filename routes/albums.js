/* eslint-disable camelcase */
/** @module */

const debug = require('debug')('lib/albums')
const { _ } = require('../lib/utils')

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
GET /albums/:year/events/:event_id/photos => returns a list of photos for an event

POST /albums => create a new album
PUT /albums/:album_id => update an existing album
DELETE /albums/:album_id => delete an existing album
*/

/**
 * Handler for default GET /albums route
 *
 * @param   {Request}  req
 * @param   {Response}  res
 *
 * @return  {void}
 *
 * @example
 * GET /api/v1/albums?filter=[year,...] => JSON
 * GET /albums?filter=[year,...] => HTML
 */
router.get('/', async (req, res) => {
  const projection = req.query?.filter ? req.query.filter.split(',') : ['year']
  const recs = await PhotoAlbum.find({}, projection) // returns [ { _id: '', year: '2023' }, ... ]

  debug('recs in /albums: %0', recs)

  const years = _.sortedUniq(
    _.map(recs, rec => rec.year) // [ '2023', '2022', '2023', ... ]
      .sort((a, b) => a - b)
  ) // returns [ 2022, 2023 ]

  if (_.isDev() && req.originalUrl.startsWith('/api/v1')) {
    res.send({ years })
    return
  }

  res.render('albums/year_list', {
    years,
    title: 'Photo Albums by Year'
  })
})

/**
 * Handler for GET /albums/:year/events route
 *
 * @param   {Request}  req
 * @param   {Response}  res
 *
 * @return  {void}
 *
 * @example
 * GET /api/v1/albums/2023/events => JSON
 * GET /albums/2023/events => HTML
 */
router.get('/:year/events', async (req, res) => {
  const year = req.params.year
  const events = await PhotoAlbum.find({ year }) // , ['event_name', 'event_date'])

  if (_.isDev() && req.originalUrl.startsWith('/api/v1')) {
    res.send(events)
  }

  res.render('albums/event_list', {
    events,
    year,
    title: `Events for ${year}`,
    fmt: e => {
      // formatting helper function
      return {
        anchor: `/photos/${year}/${e.event_slug}`,
        label: `${new Date(e.event_date).toDateString()}: ${e.event_name}`
      }
    }
  })
})

/**
 * Handler for GET /:year/events/:event_id/photos route
 *
 * @param   {Request}  req
 * @param   {Response}  res
 *
 * @return  {void}
 *
 * @example
 * GET /api/v1/albums
 */
router.get('/:year/events/:event_id/photos', async (req, res) => {
  // route /albums/:year/events/:event_id
  // display photos for a specific event

  const { year, event_id } = req.params

  const event = await PhotoAlbum.findOne({ year, _id: event_id })

  if (!event) {
    return res.status(404).send('Event not found')
  }

  const photos = _.get(event, 'photos', [])

  if (_.isDev() && req.originalUrl.startsWith('/api/v1')) {
    res.send(photos)
    return
  }

  res.render('albums/photo_list', {
    photos,
    event,
    year,
    title: `Photos for ${event.event_name}`,
    fmt: p => ({
      caption: p.caption,
      img: p.location_uri
    })
  })
})

module.exports = router
