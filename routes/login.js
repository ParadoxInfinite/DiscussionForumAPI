const express = require('express');
const app = express();
const path = require('path')
const forumRoutes = require('./forum');
const router = express.Router();

router.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.post('/login', (req, res, next) => {
  console.log(req.body);
  if (req.body.username == "asdf" && req.body.password == "asdf")
    res.redirect('/forums');
  else
    res.redirect('/login')
});

module.exports = router;