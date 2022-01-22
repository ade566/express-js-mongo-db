var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) throw err
  var db = client.db('bwa_storegg')

  db.collection('users').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})