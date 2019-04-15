const express = require('express');
const path = require('path');
var Filter = require('bad-words'),
  filter = new Filter();
const forumRoutes = require('./forum');
const PostSchema = require('../util/PostSchema');

const router = express.Router();
router.get('/createpost', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'createpost.html'));
});

router.post('/createpost', (req, res, next) => {
  var title = req.body.title;
  var category = req.body.category;
  var postContent = filter.clean(req.body.post);
  var newPost = new PostSchema({
    title: title,
    category: category,
    post: postContent
  });
  var MongoClient = require('mongodb').MongoClient

  MongoClient.connect('mongodb://localhost:27017/discussionforum', {
    useNewUrlParser: true
  }, function(err, client) {
    if (err) throw err

    var db = client.db('discussionforum')

    db.collection('Posts').insertOne(newPost);
  })
  res.redirect('/forums');
});

module.exports = router;