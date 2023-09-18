# API Documentation

## PHOTO ALBUMS ROUTES

### Albums

### GET /api/v1/albums/years
returns a list of years
```
[
  {
    id: ...,
    year: '2023'
  },
  ...
]
```

### GET /api/v1/albums/:year/events
returns a list of events for the given year

### GET /api/v1/albums/:year/events/:event_id
returns a list of photos for an event

### POST /albums => create a new album
### PUT /albums/:album_id => update an existing album
###DELETE /albums/:album_id => delete an existing album

### Events

### GET /api/v1/events/:event_id
returns a list of photos for a single event by id
```
{

}
```

### POST /api/v1/events
creates a new event

### PUT /api/v1/events/:event_id
updates an event

### DELETE /api/v1/events/:event_id
deletes an event by id