const express = require('express');
const path = require('path')
const forumRoutes = require('./login');
var MongoClient = require('mongodb').MongoClient
const router = express.Router();
const UserSchema = require('../util/UserSchema');


router.get('/register', (req, res, next) => {
  res.render('register', {
    error: null
  });
});

router.post('/register', (req, res, next) => {
  var pass = req.body.password;
  var cpass = req.body.cpassword;
  if (pass !== cpass) {} else {
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
          if (result[0]) {
            res.render('register', {
              error: "Username already exists"
            });
          } else {
            var newUser = new UserSchema({
              username: req.body.username,
              email: req.body.email,
              usn: req.body.usn,
              password: req.body.password
            });
            db.collection('Users').insertOne(newUser);
            res.redirect('/login');
          }
        }
      })
    })
  };
});

module.exports = router;