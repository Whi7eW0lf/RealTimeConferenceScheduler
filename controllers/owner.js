const ConferenceSession = require("../models/session");
const User = require("../models/user");
const Speaker = require("../models/speaker");
const Hall = require("../models/hall");
const Conference = require("../models/conference");
const Venue = require("../models/venues");


exports.getMyConferences = (req, res, next) => {
    Conference.find({userId: req.user._id}).populate("userId").populate("address").then(conf => {
        res.render("my-conferences", {
            pageTitle: "My Conferences",
            isLoggedIn: req.session.isLoggedIn,
            path: "/myconferences",
            conferences: conf
        })
    })

}

exports.getAddConference = (req, res, next) => {

    Venue.find().then(venues => {
        res.render("add-conference", {
            venues: venues.slice(0, 1000),
            pageTitle: 'Add Conference',
            isLoggedIn: req.session.isLoggedIn,
            path: "/add-conferences"
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
    Conference.findOne({name: name}).then(conf => {
        if (!conf && (newConference.startTime < newConference.endTime)) {
            return newConference.save().then(() => {
                return req.user.addToConfOwner(newConference)
            }).then(() => {
                res.redirect("/allconferences");
                console.log("Conference added successful")
            }).catch(err => console.log(err))
        } else {
            console.log("Conference already exist!")
            res.redirect("/add-conference");
        }
    })

}

exports.postAddNewSession = (req, res, next) => {
    const venueId = req.body.venueId
    const speakerId = req.body.speaker
    const hallId = req.body.hall
    const conferenceId = req.body.conferenceId
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const session = new ConferenceSession({
        venueId,
        speakerId,
        hallId,
        conferenceId,
        startTime,
        endTime
    });
    Conference.findById(conferenceId).populate("userId").then(conf => {
        
        if(conf.userId._id.toString() === req.user._id.toString() && 
        (session.startTime < session.endTime)) {
                return session.save().then(() => {
                    
                        res.redirect("/myconferences");
                        console.log("ADDED SESSION");
                    
                })
        
            } 
            else {
                console.log("Not your conference or endtime is starttime")
                res.redirect("/")
            }
})

}

exports.getAddHall = (req, res, next) => {

    Venue.find().then(venues => {
        res.render("add-hall", {
            venues: venues,
            pageTitle: 'Add Hall',
            isLoggedIn: req.session.isLoggedIn,
            path: "/add-hall"
        }).catch(err => console.log(err))
    })
}

exports.postAddHall = (req, res, next) => {
    const name = req.body.name;
    const seats = req.body.seats;
    const venueId = req.body.venueId;
    const halls = new Hall({name, seats, venueId});

    Hall.findOne({name: name}).then(hall => {
        if (!hall) {
            halls.save().then(() => {
                res.redirect("/");
                console.log("Hall added successful!");
            }).catch(err => console.log(err))
        } else {
            console.log("Hall already exist!");
            res.redirect("/add-hall");
        }
    }).catch(ex => console.log(ex));
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

    const newSpeaker = new Speaker({name, description, profilePhoto});

    Speaker.findOne({name: name}).then(speaker => {
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
