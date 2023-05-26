const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');
const profileController = require('../controllers/profile-controller');

router.get('/profile', auth.checkAuthenticated, profileController.renderProfile);
router.post('/profile/update', auth.checkAuthenticated, profileController.updateProfile);

module.exports = router;
