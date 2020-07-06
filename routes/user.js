const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();
router.get("/", userController.getIndex);

router.get("/add-speaker", userController.addSpeaker);
router.post("/add-speaker", userController.postAddSpeaker);

router.get("/add-hall", userController.addHall);
router.post("/add-new-hall", userController.postAddNewHall);

router.get("/allconferences", userController.getConferences);

router.get("/add-conference", userController.addConference);
router.post("/add-conference", userController.postAddConference);

router.get("/allconferences/:conferenceId", userController.getConference)

module.exports = router;
