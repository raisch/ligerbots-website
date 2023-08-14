/* eslint-disable camelcase */

/*
POST /photos => create a new photo (requires a year and an event)
UPDATE /photos/:photo_id
DELETE /photos/:photo_id
*/

const _ = require('lodash')
const express = require('express')
const { Photo } = require('./../models/photo')
const { Album } = require('./../models/album')
const router = express.Router()

router.post('/', async (req, res) => {})

// router.update('/:photo_id', async (req, res) => {})

// router.delete('/:photo_id', async (req, res) => {})

router.get('/', async (req, res) => {
  // route /photos
  // route = /photos
  const recs = await Album.find({}, ['year']) // returns [ { _id: '', year: '2023' }, ... ]

  const years = _.sortedUniq(
    _.map(recs, rec => rec.year) // [ '2023', '2022', ... ]
      .sort((a, b) => a - b)
  ) // returns [ 2022, 2023 ]

  res.render('albums/year_list', {
    years,
    title: 'Photo Albums by Year'
  })
})

router.get('/:year', async (req, res) => {
  // route /photos/2022
  // /photos/2023
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

router.get('/:year/:event_name', async (req, res) => {
  // route: /photos/2022/eventNme
  const { year, event_name } = req.params
  const result = await Album.findOne({ year, event_name })
  console.log(JSON.stringify({ result }, null, 2))
  res.render('albums/photo_page', {
    photos: result.photos,
    year,
    event_name
  })
})

router.get('/:year/:event_name/edit', async (req, res) => {
  const { year, event_name } = req.params
  res.render('albums/photo_page_add_photo', {
    year,
    event_name
  })
})

// create a new photoalbum record
router.post('/:year/:event_name/photo', async (req, res) => {
  const { year, event_name } = req.params
  const { caption, placement, location_uri } = req.body

  console.log(JSON.stringify({ params: req.params, body: req.body }))

  const album = await Album.findOne({ year, event_name })

  const photo = new Photo({
    caption,
    placement,
    location_uri
  })

  album.photos.push(photo)

  await album.save().then(() => res.redirect('/'))
})

// update a photoalbum
router.put('/', async (req, res) => {})

module.exports = router
