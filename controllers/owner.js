const ConferenceSession = require("../models/session");
const User = require("../models/user");
const Speaker = require("../models/speaker");
const Hall = require("../models/hall");
const Conference = require("../models/conference");
const Venue = require("../models/venues");


exports.getMyConferences = (req, res, next) => {
    Conference.find({userId: req.user._id})
    .populate("userId")
    .populate("address")
    .then(conf => {
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

    session.save().then(sessions => {

        res.redirect("/myconference");
        console.log("ADDED SESSION")

    }).catch(err => console.log(err));

}

exports.postAddNewHall = (req, res, next) => {
    const name = req.body.name;
    const seats = req.body.seats;
    const venueId = req.body.venueId;
    const halls = new Hall({name, seats, venueId});

    halls.save().then(() => {
        res.redirect("/")
    }).catch(err => console.log(err))
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

    Speaker.findOne({name:name}).then(speaker=>{
        if(!speaker){
            newSpeaker.save().then(result => {
                console.log("Added speaker");
                res.redirect("/")
            }).catch(err => console.log(err))
        }else{
            console.log("Speaker is not added!")
            res.redirect("/add-speaker")
        }
    }).catch(err=>console.log(err));

}
