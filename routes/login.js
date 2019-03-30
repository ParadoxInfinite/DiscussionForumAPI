const express = require('express');
const path = require('path')
const forumRoutes = require('./forum');


const router = express.Router();

router.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.post('/login', (req, res, next) => {
    console.log(req.body);
    res.redirect('/forums');
});

module.exports = router;





 
// var mongoose = require("mongoose");
// mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/DiscussionForum");
// var userSchema = new mongoose.Schema({
//  username: String,
//  password: String
// });
// var User = mongoose.model("User", userSchema);
