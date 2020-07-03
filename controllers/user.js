const Venue = require("../models/venues")
const speaker = require("../models/speaker")

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


exports.postAddSpeaker = (req,res,next) => {
    const name = req.body.name;
    const description = req.body.description;
    const imageUrl = req.body.profileImg;

    const speaker = new Speaker({
        name,
        description,
        imageUrl

    });

    speaker.save()
    .then(result =>{
        console.log("Added speaker");
        res.redirect("/")
    })
    .catch(err=>console.log("error"))

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
        res.render("add-venue", {
            venues: venues,
            pageTitle: 'Add hall',
            path: "/"
        })
    })
    .catch(err => console.log(err))
}
exports.addConference = (req, res, next) => {
    Venue.find()
    .then(venues => {
        res.render("add-conference", {
            venues: venues,
            pageTitle: 'Add conference',
            path: "/"
        })
    })
    .catch(err => console.log(err))
}
