/* eslint-disable camelcase, no-unused-vars */
/** @module */

/*
GET /photos/:event_slug
POST /photos => create a new photo (requires a year and an event)
UPDATE /photos/:photo_id
DELETE /photos/:photo_id
*/

const express = require('express')

const { _, stringify } = require('../lib/utils')

const { Photo } = require('../models/Photo')
const { PhotoAlbum } = require('./../models/PhotoAlbum')
const router = express.Router()

router.post('/', async (req, res) => {})

router.get('/', async (req, res) => {
  // route /api/albums
  const recs = await PhotoAlbum.find({}, ['year']) // returns [ { _id: '', year: '2023' }, ... ]

  const years = _.sortedUniq(
    _.map(recs, rec => rec.year) // [ '2023', '2022', ... ]
      .sort((a, b) => a - b)
  ) // returns [ 2022, 2023 ]

  res.render('albums/year_list', {
    years,
    title: 'Photo Albums by Year'
  })
})

// router.get('/:year', async (req, res) => {
//   // route /photos/2022
//   // /photos/2023
//   const year = req.params.year
//   const events = await PhotoAlbum.find({ year }, ['event_name', 'event_date'])
//   res.render('albums/event_list', {
//     events,
//     year,
//     title: `Events for ${year}`,
//     fmt: e => {
//       // formatting helper function
//       return {
//         anchor: `/photos/${year}/${e.event_name}`,
//         label: `${e.event_date}: ${e.event_name}`
//       }
//     }
//   })
// })

router.get('/:event_slug', async (req, res) => {
  // route: /photos/the-big-event
  const { event_slug } = req.params
  const result = await PhotoAlbum.findOne({ 'event.slug': event_slug })
  if (!result) {
    res.render('main/error')
    return
  }
  res.render('albums/photo_page', {
    photos: result?.photos || [],
    year: result.year,
    event_name: result?.event?.name,
    event_slug: result?.event?.slug
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

  const album = await PhotoAlbum.findOne({ year, event_name })

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
