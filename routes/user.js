const express = require("express");
const userController = require("../controllers/user");
const ownerController = require("../controllers/owner");
const isAuthenticated = require("../middleware/authentication")
const router = express.Router();


router.get("/", userController.getIndex);

router.get("/add-hall", isAuthenticated, ownerController.getAddHall);
router.post("/add-new-hall", isAuthenticated, ownerController.postAddHall);

router.get("/allconferences", userController.getConferences);

router.get("/add-conference", isAuthenticated, ownerController.getAddConference);
router.post("/add-conference", isAuthenticated, ownerController.postAddConference);

router.post("/add-session", ownerController.postAddNewSession);

router.get("/allconferences/:conferenceId", userController.getConferenceDetails)

router.get("/myconferences", ownerController.getMyConferences);

module.exports = router;
