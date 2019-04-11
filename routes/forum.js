const express = require('express');
const path = require('path');
const app = express();
const rootDir = require('../util/path');

const router = express.Router();


router.get('/forums', (req, res, next) => {
  var MongoClient = require('mongodb').MongoClient

  MongoClient.connect('mongodb://localhost:27017/discussionforum', {
    useNewUrlParser: true
  }, function(err, client) {
    if (err) throw err

    var db = client.db('discussionforum')

    db.collection('Posts').find().toArray(function(err, result) {
      if (err) throw err
      res.render('forums', {
        results: result
      });
    })
  })
});


module.exports = router;