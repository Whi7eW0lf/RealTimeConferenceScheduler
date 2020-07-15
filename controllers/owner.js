const Session = require("../models/session");
const Hall = require("../models/hall");
const Conference = require("../models/conference");
const Venue = require("../models/venues");
const session = require("express-session");
const checkExistingSession = require("../util/checkExistingSession");
const {nameRegex} = require("../util/nameRegex");
const User = require("../models/user");
const collisionCheck = require("../util/collisionCheck");
const maximumProgramme = require("../util/maximumProgrammeAlgorithm");


exports.getMyConferences = (req, res, next) => {
    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
        Conference.find({ userId: req.user._id }).populate("userId").populate("address").then(conf => {
            Session.find()
            .populate("conferenceId")
            .populate("hallId")
            .then(sessions => {
                let existingSessions = []
                req.user.session.sessions.forEach(s => {
                    sessions.forEach(session => {
                        if (session._id.toString() === s._id.toString()) {
                            existingSessions.push(session)
                        }
                    })
                })
                    res.render("my-conferences", {
                    pageTitle: "My Conferences",
                    isLoggedIn: req.session.isLoggedIn,
                    path: "/myconferences",
                    conferences: conf,
                    errorMessage: message,
                    userRole: req.user.role,
                    attendingSessions: existingSessions || [],
                    currentDate: req.date
                })
            })
        }).catch(err => console.log(err))
    }



exports.getAddConference = (req, res, next) => {
    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    } Venue.find().then(venues => {
        res.render("add-conference", {
            venues: venues.slice(0, 1000),
            pageTitle: 'Add Conference',
            isLoggedIn: req.session.isLoggedIn,
            path: "/add-conferences",
            errorMessage: message
        })
    }).catch(err => console.log(err))
}

exports.postAddConference = (req, res, next) => {
    let {
        name,
        description,
        startTime,
        endTime,
        address,
        speakerName,
        speakerDescription,
        speakerImg
    } = {
        ...req.body
    };
    name = name.trim()
    const found = name.match(nameRegex)
    const nowTime = new Date();

    if (found === null || name !== found[0]) {
        req.flash("error", "Conference name is not valid. It has to start with Capital letter and only contain letters,numbers and whitespaces.")
        res.redirect("/add-conference");
    } else {

        const userId = req.user._id;
        const newConference = new Conference({
            name,
            description,
            startTime,
            endTime,
            address,
            speakerName,
            speakerImg,
            speakerDescription,
            userId
        })

        const speakerName2 = speakerName.trim();

        const speakerNameFound = speakerName2.match(/([A-Z]{1,1}[A-Za-z]+) ([A-Z]{1,1}[A-Za-z]+)/gm);


        if (newConference.startTime < nowTime && newConference.endTime < nowTime) {
            req.flash("error", "Cannot add conference in past!")
            res.redirect("/add-conference")
        } else if (speakerName2 === '') {
            req.flash("error", "Speaker name cannot be empty string!")
            res.redirect("/add-conference");
        } else if (speakerNameFound === null || speakerNameFound[0] !== speakerName2) {
            req.flash("error", "First name and last name, on speaker must be starting with capital letter!")

            res.redirect("/add-conference");
        }
        else {

        Conference.findOne({name: name}).then(conf => {

            if (conf) {
                req.flash("error", "Conference name is already in use. Please choose different name.")
                res.redirect("/add-conference");
            } else if (newConference.startTime > newConference.endTime) {
                req.flash("error", "End time must be greated than start time.")
                res.redirect("/add-conference");
            } else {
                return newConference.save().then(() => {
                    return req.user.addToConfOwner(newConference)
                }).then(() => {
                    res.redirect("/allconferences");
                    console.log("Conference added successful")
                }).catch(err => console.log(err))
            }
        })
    }
    }
}

exports.postAddNewSession = (req, res, next) => {
    const { conferenceId, hallId, startTime, endTime } = {
        ...req.body
    }
    let sessionSeats;
    Hall.find().then(halls => {
        const hall = halls.filter(h => h._id.toString() === hallId.toString())[0];
        sessionSeats = hall.seats;
        const session = new Session({
            conferenceId,
            sessionSeats,
            hallId,
            startTime,
            endTime
        });
        let existingSessions = []
        Session.find().then(sessions => {
            hall.hallSession.sessions.forEach(session => {
                sessions.forEach(s => {
                    if(s._id.toString() === session._id.toString()) {
                        existingSessions.push(s)
                    }
                })
            })   
            existingSessions.sort((a,b) => a.startTime - b.startTime);
           
            Conference.findById(conferenceId).populate("userId").then(conf => {
                if (collisionCheck(session, existingSessions) === false ) {
                    req.flash("error", "Coliision detected.")
                    res.redirect("/allconferences");
                } else if (session.startTime < conf.startTime || session.endTime > conf.endTime) {
                    req.flash("error", "Session start time and end time must be between conference start time and end time")
                    res.redirect("/allconferences");
                } else if (session.startTime > session.endTime) {
                    req.flash("error", "Session end time must be greated then start time. Please try again.");
                    res.redirect("/allconferences");
                } else if (conf.userId._id.toString() !== req.user._id.toString()) {
                    req.flash("error", "You can only add session for a conference that you created.");
                    res.redirect("/allconferences");
                }else {
                    hall.addSession(session)
                    return session.save().then(() => {
                        res.redirect("/myconferences");
                        console.log("ADDED SESSION");
                    })
                }
            })
        })
    }).catch(err => console.log(err))
}

exports.getAddHall = (req, res, next) => {
    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    } Venue.find().then(venues => {
        res.render("add-hall", {
            venues: venues,
            pageTitle: 'Add Hall',
            isLoggedIn: req.session.isLoggedIn,
            path: "/add-hall",
            errorMessage: message
        })
    })
}

exports.postAddHall = (req, res, next) => {
    const name = req.body.name;
    const seats = req.body.seats;
    const venueId = req.body.venueId;
    const newHall = new Hall({ name, seats, venueId });
    Venue.findById(venueId).then(venue => {
        Hall.find().then(halls => {
            let isExisting = false;
            for (hall of halls) {
                if ((hall.name === newHall.name && hall.venueId.toString() === newHall.venueId.toString())) {
                    isExisting = true;
                }
            }
            if (isExisting) {
                req.flash("error", "This hall already exists.")
                res.redirect("/add-hall");
            } else {
                venue.addHall(newHall._id)
                return newHall.save().then(() => {
                    res.redirect("/");
                    console.log("Hall added successful!");
                }).catch(err => console.log(err))
            }
        })

    })
}

exports.postJoinSession = (req, res, next) => {
    const sessionId = req.body.sessionId;
    const conferenceId = req.body.conferenceId;
   
    Session.find().then(sessions => {
        let session = sessions.filter(session => session._id.toString() === sessionId.toString())[0];
        User.findById(req.user._id).populate("session.sessions.sessionId").then(user => {
            let existingSessions = []
            user.session.sessions.forEach(s => {
                sessions.forEach(session => {
                    if (session._id.toString() === s._id.toString()) {
                        existingSessions.push(session)
                    }
                })
            })
            existingSessions.sort((a, b) => a.startTime - b.startTime);

            if (checkExistingSession(req.user.session.sessions, session) === true) {
                req.flash("error", "You have already joined this session.")
                res.redirect("/allconferences")
    
            } else if (session.sessionSeats === 0) {
                req.flash('error', "No more seats available for this session. Please try to join other session or other conference.");
                res.redirect("/allconferences")
            } else if (collisionCheck(session, existingSessions) === false) {
                req.flash('error', "You cannot join this session because it is in collision with another session you have already joined.");
                res.redirect("/allconferences")
            }
            else {
                session.seatTaken()
                return req.user.addSession(session).then(() => {
                    res.redirect("/allconferences")
                }).catch(err => console.log(err))
            }
        })

    }).catch(err => console.log(err))
}

exports.maximumProgramme = (req,res,next)=>{
    const conferenceId = req.body.conferenceId;
    Session.find()
    // .populate("conferenceId")
    // .populate("hallId")
    .then(sessions => {
        let existingSessions = []
        req.user.session.sessions.forEach(s => {
            sessions.forEach(session => {
                if (session._id.toString() === s._id.toString()) {
                    existingSessions.push(session)
                }
            })
        })
        const conf = sessions.filter(s => s.conferenceId.toString() === conferenceId.toString())
        console.log(conf)
            // res.render("my-conferences", {
            // pageTitle: "My Conferences",
            // isLoggedIn: req.session.isLoggedIn,
            // path: "/myconferences",
            // conferences: conf,
            // errorMessage: message,
            // userRole: req.user.role,
            // attendingSessions: existingSessions || [],
            // currentDate: req.date
        // })
    })
}
