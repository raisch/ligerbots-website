/*
{
  YEAR: {
    EVENT: {
      photos: [
        {
          caption: Text,
          location: URI
        }
      ]
    }
  }
}

/photos             - contains a list of years
/photos/YEAR        - contains a list of events
/photos/YEAR/EVENT  - contains a list of photos

{
  active: Boolean,
  year: STRING,
  event: STRING,
  photos: [
    {
      caption: String,
      location: URI
    }
  ]
}

*/

const mongoose = require('mongoose')

const PhotoSchema = new mongoose.Schema({
  /* captions can be displayed with a photo */
  caption: {
    type: String,
    required: false
  },
  /* caption_placement can be 'above' or 'below */
  placement: {
    type: String,
    default: 'below',
    enum: {
      values: ['above', 'below'],
      message: 'must be one of "above" or "below"'
    }
  },
  location_uri: {
    type: String,
    required: [true, 'Photo must have a location_uri'],
    validate: {
      validator: (v) => /^https:\/\/.+\.staticflickr\.com/
      // DANGER! Assumes ALL photos live at flickr.
    }
  }
})

const PhotoAlbumSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true,
    required: true
  },
  year: {
    type: String,
    validate: {
      validator: (v) => /^\d{4}$/
    },
    required: true
  },
  event_name: {
    type: String,
    required: true
  },
  event_date: {
    type: String
  },
  photos: [PhotoSchema]
})

module.exports = mongoose.model('PhotoAlbum', PhotoAlbumSchema)

if (process.env.SETUP) {
  // Prime the db with some dummy photo data

  const MONGODB_URI = 'mongodb://localhost/blog'

  const primeData = [{
    active: true,
    year: 2022,
    event_name: 'The Big Event',
    event_date: '2022-01-01',
    photos: [
      {
        caption: 'WTF?',
        location_uri: 'https://farm66.staticflickr.com/65535/53059598537_7d7e4b51e5_z.jpg'
      }
    ]
  }, {
    active: true,
    year: 2022,
    event_name: 'Another Big Event',
    event_date: '2022-11-01',
    photos: [
      {
        caption: 'With Pringles',
        location_uri: 'https://farm66.staticflickr.com/65535/53060663853_22d9597791_z.jpg'
      }, {
        caption: 'Blue Goo',
        location_uri: 'https://farm66.staticflickr.com/65535/53060567875_c492264465_z.jpg'
      }
    ]
  }, {
    active: true,
    year: 2023,
    event_name: 'Copy of Another Big Event',
    event_date: '2023-01-01',
    photos: [
      {
        caption: 'With Pringles',
        location_uri: 'https://farm66.staticflickr.com/65535/53060663853_22d9597791_z.jpg'
      }, {
        caption: 'Blue Goo',
        location_uri: 'https://farm66.staticflickr.com/65535/53060567875_c492264465_z.jpg'
      }
    ]
  }]

  function dieDieDie (msg) {
    console.error(msg)
    process.exit(-1)
  }

  async function dropPhotoAlbums () {
    console.log('dropping photoalbums')
    return mongoose.connection.dropCollection('photoalbums')
  }

  const PhotoAlbum = module.exports

  async function primeDb (data) {
    await dropPhotoAlbums()
    data.forEach(async (d) => {
      console.log(`working on ${d}`)
      const rec = new PhotoAlbum(d)
      await rec.save()
      console.log(`saved album: ${rec}`)
    })
  }

  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useCreateIndex: true
    })
    .catch(err => {
      console.error(`failed to connect to mongoose: ${err}`)
      process.exit(-1)
    })
    .then(async () => {
      await primeDb(primeData).catch(err => dieDieDie(err))
      console.log('completed')
    })
}
