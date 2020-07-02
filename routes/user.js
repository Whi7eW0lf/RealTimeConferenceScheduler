const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();
router.get("/", userController.getConferences);

router.get("/login", userController.getLogin);

router.get("/signup", userController.getLogin);

router.get("/add-speaker", userController.addSpeaker);

router.get("/add-venue", userController.addVenue);

router.get("/add-conference", userController.addConference);

module.exports = router;
