const ConferenceSession = require("../models/session");
const User = require("../models/user");
const Hall = require("../models/hall");
const Conference = require("../models/conference");
const Venue = require("../models/venues");


exports.getMyConferences = (req, res, next) => {
    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    Conference.find({ userId: req.user._id }).populate("userId").populate("address").then(conf => {
        res.render("my-conferences", {
            pageTitle: "My Conferences",
            isLoggedIn: req.session.isLoggedIn,
            path: "/myconferences",
            conferences: conf,
            errorMessage: message
        })
    })

}

exports.getAddConference = (req, res, next) => {
    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    Venue.find().then(venues => {
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

    const name = req.body.name
    const description = req.body.description
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const address = req.body.address;
    const speakerName = req.body.speakerName;
    const speakerDescription = req.body.speakerDesc;
    const speakerImg = req.body.speakerImg;
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
    Conference.findOne({ name: name }).then(conf => {
        console.log(conf)
        console.log(newConference)
        if (conf) {
            req.flash("error", "Conference name is already in use. Please choose different name.")
            res.redirect("/add-conference");
        }
        else if (newConference.startTime > newConference.endTime) {
            req.flash("error", "End time must be greated than start time.")
            res.redirect("/add-conference");
        }
        else {
            return newConference.save().then(() => {
                return req.user.addToConfOwner(newConference)
            }).then(() => {
                res.redirect("/allconferences");
                console.log("Conference added successful")
            }).catch(err => console.log(err))
        }
    })

}

exports.postAddNewSession = (req, res, next) => {
    const conferenceId = req.body.conferenceId
    const hallId = req.body.hall
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const session = new ConferenceSession({
        conferenceId,
        hallId,
        startTime,
        endTime
    });
    Conference.findById(conferenceId).populate("userId").then(conf => {
        if (conf.userId._id.toString() !== req.user._id.toString()) {

            req.flash("error", "You can only add session for a conference that you created.")
            res.redirect("/myconferences");

        } else if (session.startTime > session.endTime) {
            req.flash("error", "Session end time must be greated then start time. Please try again.")
            res.redirect("/myconferences");
        }
        else {
            return session.save().then(() => {
                res.redirect("/myconferences");
                console.log("ADDED SESSION");
            })
        }
    })

}
exports.getAddHall = (req, res, next) => {
    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    Venue.find().then(venues => {
        res.render("add-hall", {
            venues: venues,
            pageTitle: 'Add Hall',
            isLoggedIn: req.session.isLoggedIn,
            path: "/add-hall",
            errorMessage: message
        }).catch(err => console.log(err))
    })
}

exports.postAddHall = (req, res, next) => {
    const name = req.body.name;
    const seats = req.body.seats;
    const venueId = req.body.venueId;
    const halls = new Hall({ name, seats, venueId });

    Hall.findOne({ name: name }).then(hall => {
        if (!hall) {
            halls.save().then(() => {
                res.redirect("/");
                console.log("Hall added successful!");
            }).catch(err => console.log(err))
        } else {
            req.flash("error", "This hall already exists.")
            res.redirect("/add-hall");
        }
    }).catch(err => console.log(err));
}
exports.getAddSpeaker = (req, res, next) => {
    res.render("add-speaker", {
        pageTitle: 'Add speaker',
        isLoggedIn: req.session.isLoggedIn,
        path: "/add-speaker"
    })
}
exports.postAddSpeaker = (req, res, next) => {

    const name = req.body.name;
    const description = req.body.description;
    const profilePhoto = req.body.profileImg;

    const newSpeaker = new Speaker({ name, description, profilePhoto });

    Speaker.findOne({ name: name }).then(speaker => {
        if (!speaker) {
            newSpeaker.save().then(result => {
                console.log("Added speaker");
                res.redirect("/")
            }).catch(err => console.log(err))
        } else {
            console.log("Speaker is not added!")
            res.redirect("/add-speaker")
        }
    }).catch(err => console.log(err));

}