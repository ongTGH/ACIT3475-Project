const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');
const authController = require('../controllers/auth-controller');

router.get('/signin', auth.checkNotAuthenticated, authController.renderSignIn);
router.get('/signup', auth.checkNotAuthenticated, authController.renderSignUp);
router.post('/signin', auth.checkNotAuthenticated, authController.signInUser);
router.post('/signup', auth.checkNotAuthenticated, authController.createUser);
router.get('/logout', auth.checkAuthenticated, authController.logoutUser);

module.exports = router;
