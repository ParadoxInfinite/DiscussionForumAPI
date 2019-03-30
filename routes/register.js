const express = require('express');
const path = require('path')
const forumRoutes = require('./login');


const router = express.Router();

router.get('/register', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'register.html'));
});

router.post('/register', (req, res, next) => {
    console.log(req.body);
    res.redirect('/login');
});

module.exports = router;
