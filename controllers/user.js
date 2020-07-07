const Venue = require("../models/venues");
const Speaker = require("../models/speaker");
const Hall = require("../models/hall");
const Conference = require("../models/conference");

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

        const formatDateTime = formatDateTimeConferences(conferences);

        res.render("index", {
            pageTitle: "Welcome to conferences",
            path: '/',
            conferences: formatDateTime.slice(0, 3)
        })
    }).catch(err => console.log(err))

}

exports.getMyConferences = (req, res, next) => {

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
            conferences: formatDateTimeConferences(conferences)
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

function formatDateTimeConferences(object) {
    return formatDateTime = object.map(e => {
        const startTime = e.startTime.toString().substring(0, 21);
        const endTime = e.endTime.toString().substring(0, 21);
        return {
            _id: e._id,
            name: e.name,
            description: e.description,
            startTime: startTime,
            endTime: endTime,
            address: e.address
        }

    });
}
