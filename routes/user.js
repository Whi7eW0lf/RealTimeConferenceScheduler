const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();
router.get("/", userController.getConferences);


router.get("/login", userController.getLogin);
router.get("/signup", userController.getSignIn);

router.get("/add-speaker", userController.addSpeaker);
router.post("/add-speaker", userController.postAddSpeaker);

router.get("/add-hall", userController.addHall);
router.post("/add-new-hall", userController.postAddNewHall);

router.get("/add-conference", userController.addConference);
router.post("/add-conference", userController.postAddConference);

router.get("/:conferenceId", userController.getConference)

module.exports = router;
