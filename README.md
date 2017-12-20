Simple RequestBin Replacement
=============================

Very simple app that saves HTTP POST data to a local lowdb file. File is saved in `.data` so it will not be carried across in remixes.

Request records look like this:
```
{
  "id": "shortid",
  "timestamp": "2017-12-09T17:47:02.407Z",
  "ips": "a. .l.i.s,t. .o.f, .i.p.s",  (the contents of the X-Forwarded-For header)
  "body": {
    "some":"json"
  },
  "headers": {
    "header-key": "header-value",
    ...
  }
}
```

Simply `POST` to the root url and the `POST` body will be saved to .data/db.json.

WARNING:
The POST data is persisted to the database file in plain text, and is sent to any anonymous requestor in plain text over the internets. Do not send POSTs to this service if they contain even slightly important secrets.

`GET /ids` returns an array of the ids currently in the database

`GET /last` returns the last element in the database's JSON file. Presumably this will be the last POST added, but there's no guarantee of that; this is really just a convenience. Also, hopefully "last" will never be the id of a request, or we'll never be able to get to that.

`GET /:id` returns the record matching the supplied id as JSON. This allows captured requests to be shared.

`GET  /:id/body` returns just the body of the matching record

To reset the database delete `.data/db.json` using the console. The app will automatically create a new, blank db.