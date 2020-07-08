const Venue = require("../models/venues");
const Conference = require("../models/conference");
<<<<<<< HEAD

=======
const ConferenceSession = require("../models/session");
const Session = require("../models/session");
>>>>>>> 13d45c1629cb16985847334b4c02382658b959a4
const dateFormater = require("../util/dateFormater");

exports.getIndex = (req, res, next) => {
    Conference.find().populate("address").then(conferences => {

        const formatDateTime = dateFormater(conferences);
        res.render("index", {
            pageTitle: "Welcome to conferences",
            isLoggedIn: req.session.isLoggedIn,
            path: '/',
            conferences: formatDateTime.slice(0, 3),
            isLoggedIn: req.session.isLoggedIn
        })
    }).catch(err => console.log(err))

}
exports.getConferences = (req, res, next) => {

    Conference.find().populate("address").then(conferences => {

        res.render("event-form", {
            pageTitle: "All conferences",
            isLoggedIn: req.session.isLoggedIn,
            path: '/all-conferences',
            conferences: dateFormater(conferences)
        })
    }).catch(err => console.log(err))

}

<<<<<<< HEAD



=======
exports.getMyConferences = (req, res, next) => {
    Conference.find({userId: req.user._id})
    .populate("userId")
    .populate("address")
    .then(conf => {
        res.render("my-conferences", {
            pageTitle: "My Conferences",
            isLoggedIn: req.session.isLoggedIn,
            path: "/my-conferences",
            conferences: conf
        })
    })

}


exports.getConferenceDetails = (req, res, next) => {

    const confId = req.params.conferenceId;
    Conference.findOne({_id: confId}).populate("address").then(conf => {
        ConferenceSession.find({conferenceId: conf._id})
        .populate("hallId")
        .populate("speakerId")
        .then(sessions => {
            console.log(sessions)
            Hall.find().then(halls => {
                Speaker.find().then(speakers => {
                    res.render("conference-details", {
                        halls: halls,
                        speakers: speakers,
                        pageTitle: conf.name,
                        isLoggedIn: req.session.isLoggedIn,
                        path: "/",
                        conference: conf,
                        sessions: sessions || []
                    })
                })
            })

        })

    }).catch(err => console.log(err))
}

exports.postAddNewSession = (req, res, next) => {
    const venueId = req.body.venueId
    const speakerId = req.body.speaker
    const hallId = req.body.hall
    const conferenceId = req.body.conferenceId
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    const session = new Session({
        venueId,
        speakerId,
        hallId,
        conferenceId,
        startTime,
        endTime
    });

    session.save().then(sessions => {

        res.redirect("/myconference");
        console.log("ADDED SESSION")

    }).catch(err => console.log(err));

}

exports.addConference = (req, res, next) => {

    Venue.find().then(venues => {
        res.render("add-conference", {
            venues: venues.slice(0, 1000),
            pageTitle: 'Add Conference',
            isLoggedIn: req.session.isLoggedIn,
            path: "/add-conference"
        })
    }).catch(err => console.log(err))

}
exports.postAddConference = (req, res, next) => {

    const name = req.body.name
    const description = req.body.description
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const address = req.body.address;
    const userId = req.user._id;
    const newConference = new Conference({
        name,
        description,
        startTime,
        endTime,
        address,
        userId
    })
    return newConference.save().then(() => {
        return req.user.addToConfOwner(newConference)
    }).then(() => {
        res.redirect("/");
    }).catch(err => console.log(err))
}
>>>>>>> 13d45c1629cb16985847334b4c02382658b959a4


exports.addHall = (req, res, next) => {

    Venue.find().then(venues => {
        res.render("add-hall", {
            venues: venues,
            pageTitle: 'Add Hall',
            isLoggedIn: req.session.isLoggedIn,
            path: "/add-hall"
        })
    }).catch(err => console.log(err))
}


