const express = require("express");
const authController = require("../controllers/authentication");

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

router.post('/login', authController.postLogin);


router.post('/logout', authController.logout);

module.exports = router;