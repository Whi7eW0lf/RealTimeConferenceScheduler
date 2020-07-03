const Venue = require("../models/venues")
const speaker = require("../models/speaker")
const hall = require("../models/hall")
const staticHall = require("..models/staticHalls")

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

exports.postAddSpeaker = (req,res,next) => {
    const name = req.body.name;

    console.log(name);

}


exports.postAddConference = (req, res, next) => {

    res.render("add-speaker", {
        pageTitle: 'Add speaker',
        path: "/"
    })
}
exports.addSpeaker = (req, res, next) => {
   
        res.render("add-speaker", {
            venues: venues,
            pageTitle: 'Add conference',
            path: "/"
        })
  
}

exports.addHall = (req, res, next) => {
    const name = req.body.name;
    const seats = req.body.seats;
    const halls = new Hall({
        name,
        seats
    });

    halls.save()
    .then(seats => {
        res.render("add-hall", {
            seats: seats,
            name: name,
            pageTitle: 'Add hall',
            path: "/"
        })
    })
    .catch(err => console.log(err))
}
