/* eslint-disable camelcase */

const _ = require('lodash')
const express = require('express')
// const stringify = require('json-stringify-safe')
// const { Photo } = require('./../models/photo')
const { Album } = require('./../models/album')
const router = express.Router()

/*
GET /albums => returns a list of years
GET /albums/:year/events => returns a list of events
GET /albums/:year/events/:event_id => returns a list of photos for an event

POST /albums => create a new album
UPDATE /albums/:album_id => update an existing album
DELETE /albums/:album_id => delete an existing album
*/

/**
 * Handler for default /albums route
 *
 * @param   {Request}  req
 * @param   {Response}  res
 *
 * @return  {void}
 */
router.get('/', async (req, res) => {
  // route /albums?filter=projection[,projection,...]
  // display a list of years that have albums

  // eslint-disable-next-line dot-notation
  const projection = req.query['filter'] ? req.query.filter.split(',') : []
  const recs = await Album.find({}, projection) // returns [ { _id: '', year: '2023' }, ... ]

  console.log(`recs in /albums: ${JSON.stringify(recs)}`)

  const years = _.sortedUniq(
    _.map(recs, rec => rec.year) // [ '2023', '2022', ... ]
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
  const events = await Album.find({ year }, ['event_name', 'event_date'])
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
