const express = require('express');
const path = require('path')
const forumRoutes = require('./login');


const router = express.Router();

router.get('/register', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'register.html'));
});

router.post('/register', (req, res, next) => {
  console.log(req.body);
  var pass = req.body.password;
  var cpass = req.body.cpassword;
  if (pass !== cpass) {} else res.redirect('/login');
});

module.exports = router;