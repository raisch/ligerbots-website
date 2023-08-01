const _ = require('lodash')
const express = require('express')
const PhotoAlbum = require('./../models/photoalbum')
const router = express.Router()

router.get('/', async (req, res) => {
  const recs = await PhotoAlbum.find({}, ['year'])
  const years = _.sortedUniq(_.map(recs, (rec) => rec.year).sort((a, b) => a - b))
  res.render('albums/year_list', {
    years,
    title: 'Photo Albums by Year'
  })
})

router.get('/:year', async (req, res) => {
  const year = req.params.year
  const events = await PhotoAlbum.find({ year }, ['event_name', 'event_date'])
  res.render('albums/event_list', {
    events,
    year,
    title: `Photo Albums by Event for ${year}`,
    fmt: (e) => { // formatting helper function
      return {
        anchor: `/photos/${year}/${e.event_name}`,
        label: `${e.event_date}: ${e.event_name}`
      }
    }
  })
})

router.get('/:year/:event', async (req, res) => {
  const { year, event } = req.params
  const photos = await PhotoAlbum.find({ year, event_name: event, }, ['photos'])
  res.render('albums/photo_page', {
    photos,
    year,
    event
  })
})

module.exports = router
