const Venue = require("../models/venues");
const Speaker = require("../models/speaker");
const Hall = require("../models/hall");
const Conference = require("../models/conference");
const User = require("../models/user");
const dateFormater = require("../util/dateFormater");

exports.getIndex = (req, res, next) => {
    Conference.find().populate("address").then(conferences => {
        const asd = conferences.map(e => {
            const endTime = e.endTime.toString().substring(0, 10);
            return {
                _id: e._id,
                name: e.name,
                description: e.description,
                startTime: e.startTime,
                endTime: endTime,
                address: e.address
            }

        });

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

exports.getMyConferences = (req, res, next) => {

    res.render("my-conferences", {
        pageTitle: "My Conferences",
        isLoggedIn: req.session.isLoggedIn,
        path: "/my-conferences"
    })
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
        Hall.find().then(halls => {
            Speaker.find().then(speakers => {
                res.render("conference-details", {
                    halls: halls,
                    speakers: speakers,
                    pageTitle: conf.name,
                    isLoggedIn: req.session.isLoggedIn,
                    path: "/",
                    conference: conf
                })
            })
        })

    }).catch(err => console.log(err))
}

exports.postAddNewSession = (req, res, next) => {
    const speaker = req.body.speaker
    const hall = req.body.hall
    const venue = req.body.venueId
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    console.log(speaker, hall, venue, startTime, endTime);


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
    let a;
    const name = req.body.name
    const description = req.body.description
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const address = req.body.address;
    const userId = req.session.user._id;
    const newConference = new Conference({
        name,
        description,
        startTime,
        endTime,
        address,
        userId
    })
    return newConference.save()
    .then(() => {
        User.findById(userId)
        .then(user => {
            return user.addToConfOwner(newConference)
        })
        .then(() => {
            res.redirect("/");
        })
    })
    .catch(err => console.log(err))
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
        isLoggedIn: req.session.isLoggedIn,
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

