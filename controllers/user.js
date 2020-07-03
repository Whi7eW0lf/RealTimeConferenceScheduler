const Venue = require("../models/venues")

exports.getLogin = (req, res, next) => {
    res.render("login", {
        pageTitle: 'Login page',
        path: "/"
    })
}
exports.getSignIn = (req, res, next) => {
    res.render("signup", {
        pageTitle: 'Login page',
        path: "/"
    })
}
exports.getConferences = (req, res, next) => {
    res.render("event-form", {
        pageTitle: 'Login page',
        path: "/"
    })
}
exports.addSpeaker = (req, res, next) => {

    res.render("add-speaker", {
        pageTitle: 'Add speaker',
        path: "/"
    })
}
exports.addVenue = (req, res, next) => {
    Venue.find()
    .then(venues => {
        console.log(venues.slice(0,10))
        res.render("add-venue", {
            venues: venues,
            pageTitle: 'Add conference',
            path: "/"
        })
    })
    .catch(err => console.log(err))
}
exports.addConference = (req, res, next) => {
    Venue.find()
    .then(venues => {
        console.log(venues.length)
        res.render("add-conference", {
            venues: venues,
            pageTitle: 'Add conference',
            path: "/"
        })
    })
    .catch(err => console.log(err))
}
