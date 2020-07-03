const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();
router.get("/", userController.getConferences);

router.get("/login", userController.getLogin);

router.get("/signup", userController.getSignIn);

router.get("/add-speaker", userController.addSpeaker);

router.post("/add-speaker", userController.postAddSpeaker);

router.get("/add-venue", userController.addVenue);

router.get("/add-conference", userController.addConference);

router.post("/add-conference", userController.postAddConference);

module.exports = router;
