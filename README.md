Simple RequestBin Replacement
=============================

Very simple app that saves HTTP POST data to a local lowdb file.

Lowdb records look like this:
```
{
  "id": "rk0c-jY-f",
  "timestamp": "2017-12-09T17:47:02.407Z",
  "ips": "24.196.151.66,::ffff:10.10.10.247,::ffff:127.0.0.1,10.10.10.148,::ffff:172.17.0.1",
  "body": {}
}
```

Simply POST to the root url and the POST body will be saved.

`GET /reset` resets the database
`GET /:id` returns the body of record matching the supplied id
