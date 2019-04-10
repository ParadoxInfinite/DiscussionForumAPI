const express = require('express');
const path = require('path')
const forumRoutes = require('./forum');


const router = express.Router();

router.get('/createpost', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'createpost.html'));
});

router.post('/createpost', (req, res, next) => {
  console.log(req.body);
  res.redirect('/forums');
});

module.exports = router;