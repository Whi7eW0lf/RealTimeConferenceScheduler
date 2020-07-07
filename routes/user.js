const express = require("express");
const userController = require("../controllers/user");
const isAuthenticated = require("../middleware/authentication")
const router = express.Router();
router.get("/", userController.getIndex);

router.get("/add-speaker", isAuthenticated, userController.addSpeaker);
router.post("/add-speaker", isAuthenticated, userController.postAddSpeaker);

router.get("/add-hall", isAuthenticated, userController.addHall);
router.post("/add-new-hall", isAuthenticated, userController.postAddNewHall);

router.get("/allconferences", userController.getConferences);

router.get("/add-conference", isAuthenticated, userController.addConference);
router.post("/add-conference", isAuthenticated, userController.postAddConference);

router.get("/allconferences/:conferenceId", userController.getConference)

router.get("/myconference", userController.getMyConferences);

module.exports = router;
