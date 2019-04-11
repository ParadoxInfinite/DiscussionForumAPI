var bodyParser = require('body-parser');

const forumRoutes = require('./routes/forum');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const createPostRoutes = require('./routes/createpost');
const path = require('path')
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')))

app.use(loginRoutes);
app.use(forumRoutes);
app.use(registerRoutes);
app.use(createPostRoutes);

app.get('/', (req, res, next) => {
  res.redirect('/login')
  next();
})
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000);