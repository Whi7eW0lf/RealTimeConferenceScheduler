  
const Venue = require("../models/venues");
const Speaker = require("../models/speaker");
const Hall = require("../models/hall");
const Conference = require("../models/conference");

exports.getIndex = (req, res, next) => {

    Conference.find().populate("address").then(conferences => {

        res.render("index", {
            pageTitle: "Welcome to conferences",
            path: '/',
            conferences: conferences.slice(0,3)
        })
    }).catch(err => console.log(err))

}

exports.getMyConferences = (req,res,next)=>{
    res.render("my-conferences", {
        pageTitle: "My Conferences",
        path: "/my-conferences"
})
}

exports.getConferences = (req, res, next) => {
    Conference.find().populate("address").then(conferences => {

        res.render("event-form", {
            pageTitle: "All conferences",
            path: '/all-conferences',
            conferences: conferences
        })
    }).catch(err => console.log(err))

}
exports.getConference = (req, res, next) => {
    const confId = req.params.conferenceId;
    Conference.findOne({_id: confId}).populate("address").then(conf => {
        res.render("conference-details", {
            pageTitle: conf.name,
            path: "/",
            conference: conf
        })
    }).catch(err => console.log(err))
}


exports.addConference = (req, res, next) => {
    Venue.find().then(venues => {
        res.render("add-conference", {
            venues: venues.slice(0, 1000),
            pageTitle: 'Add Conference',
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
    const newConference = new Conference({
        name,
        description,
        startTime,
        endTime,
        address
    })
    newConference.save().then(() => res.redirect("/")).catch(err => console.log(err))
}


exports.addHall = (req, res, next) => {
    Venue.find().then(venues => {
        res.render("add-hall", {
            venues: venues,
            pageTitle: 'Add Hall',
            path: "/add-hall"
        })
    }).catch(err => console.log(err))
}
exports.postAddNewHall = (req, res, next) => {
    const name = req.body.name;
    const seats = req.body.seats;
    const venueId = req.body.venueId;
    console.log(venueId)
    const halls = new Hall({name, seats, venueId});

    halls.save().then(seats => {
        res.redirect("/")
        console.log("ADDED HALL");
    }).catch(err => console.log(err))
}


exports.addSpeaker = (req, res, next) => {
    res.render("add-speaker", {
        pageTitle: 'Add speaker',
        path: "/add-speaker"
    })
}
exports.postAddSpeaker = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const profilePhoto = req.body.profileImg;

    const speaker = new Speaker({name, description, profilePhoto});

    speaker.save().then(result => {
        console.log("Added speaker");
        res.redirect("/")
    }).catch(err => console.log(err))

}