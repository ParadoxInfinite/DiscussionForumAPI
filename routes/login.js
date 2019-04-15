const express = require('express');
const app = express();
const path = require('path')
const forumRoutes = require('./forum');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient
router.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.post('/login', (req, res, next) => {
  var username = req.body.username;
  MongoClient.connect('mongodb://localhost:27017/discussionforum', {
    useNewUrlParser: true
  }, function(err, client) {
    if (err) throw err

    var db = client.db('discussionforum')

    db.collection('Users').find({
      username: req.body.username
    }).toArray(function(err, result) {
      if (err) {
        throw err
      } else {
        console.log(result);
        //loop needs to be created.
        if (req.body.username == result[0].username && req.body.password == result[0].password)
          res.redirect('/forums');
        else
          res.redirect('/login')
      }
    })
  })

});

module.exports = router;