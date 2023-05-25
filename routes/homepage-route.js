const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');

router.get('/', auth.checkNotAuthenticated, (req, res, next) => {
    res.render('homepage/index', { bodyClass: 'index' });
});

module.exports = router;
