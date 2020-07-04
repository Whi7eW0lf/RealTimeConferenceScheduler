const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();
router.get("/", userController.getConferences);
<<<<<<< HEAD
router.get("/:conferenceId", userController.getConference)
=======
>>>>>>> e14563d71545506ffea4fef165540caa17460184

router.get("/login", userController.getLogin);
router.get("/signup", userController.getSignIn);

router.get("/add-speaker", userController.addSpeaker);
router.post("/add-speaker", userController.postAddSpeaker);

router.get("/add-hall", userController.addHall);
router.post("/add-new-hall", userController.postAddNewHall);

router.get("/add-conference", userController.addConference);
router.post("/add-conference", userController.postAddConference);


module.exports = router;
