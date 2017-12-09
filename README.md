Simple RequestBin Replacement
=============================

Very simple app that saves HTTP POST data to a local lowdb file. File is saved in `.data` so it will not be carried across in remixes.

Lowdb records look like this:
```
{
  "id": "shortid",
  "timestamp": "2017-12-09T17:47:02.407Z",
  "ips": "a. .l.i.s,t. .o.f, .i.p.s",
  "body": {
    "some":"json"
  }
}
```

Simply `POST` to the root url and the `POST` body will be saved.

`GET /reset` resets the database

`GET /:id` returns the record matching the supplied id as JSON

`GET  /:id/body` returns just the body of the matching record