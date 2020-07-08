const ConferenceSession = require("../models/session");
const Speaker = require("../models/speaker");
const Hall = require("../models/hall");
const Conference = require("../models/conference");
const Venue = require("../models/venues");
const dateFormater = require("../util/dateFormater");

exports.getIndex = (req, res, next) => {
    Conference.find().populate("address").then(conferences => {
        console.log(conferences)
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
exports.getConferenceDetails = (req, res, next) => {

    const confId = req.params.conferenceId;
    Conference.findOne({_id: confId}).populate("address").then(conf => {
        ConferenceSession.find({conferenceId: conf._id})
        .populate("hallId")
        .populate("speakerId")
        .then(sessions => {
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


