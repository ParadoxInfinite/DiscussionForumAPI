const express = require('express');
const path = require('path');
const app = express();
const rootDir = require('../util/path');
var MongoClient = require('mongodb').MongoClient

const router = express.Router();


router.get('/forums', (req, res, next) => {

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