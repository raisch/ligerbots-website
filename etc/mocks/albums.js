const { Album } = require('../../models/Album')

module.exports = {
  name: 'albums',
  model: Album,
  data: [
    {
      active: true,
      year: 2022,
      event: {
        name: 'The Big Event',
        date: '2022-01-01'
      },
      // event_name: 'The Big Event',
      // event_date: '2022-01-01',
      photos: [
        {
          caption: 'WTF?',
          location_uri:
            'https://farm66.staticflickr.com/65535/53059598537_7d7e4b51e5_z.jpg'
        }
      ]
    },
    {
      active: true,
      year: 2022,
      event: {
        name: 'Another Big Event',
        date: '2022-11-01'
      },
      // event_name: 'Another Big Event',
      // event_date: '2022-11-01',
      photos: [
        {
          caption: 'With Pringles',
          location_uri:
            'https://farm66.staticflickr.com/65535/53060663853_22d9597791_z.jpg'
        },
        {
          caption: 'Blue Goo',
          location_uri:
            'https://farm66.staticflickr.com/65535/53060567875_c492264465_z.jpg'
        }
      ]
    },
    {
      active: true,
      year: 2023,
      event: {
        name: 'Still Another Big Event',
        date: '2023-01-01'
      },
      // event_name: 'Still Another Big Event',
      // event_date: '2023-01-01',
      photos: [
        {
          caption: 'With Pringles',
          location_uri:
            'https://farm66.staticflickr.com/65535/53060663853_22d9597791_z.jpg'
        },
        {
          caption: 'Blue Goo',
          location_uri:
            'https://farm66.staticflickr.com/65535/53060567875_c492264465_z.jpg'
        }
      ]
    }
  ]
}
