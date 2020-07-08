const Venue = require("../models/venues");
const Conference = require("../models/conference");

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


