const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/forums', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'forums.html'));
});


module.exports = router;
