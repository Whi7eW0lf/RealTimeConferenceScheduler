const ConferenceSession = require("../models/session");
const Hall = require("../models/hall");
const Conference = require("../models/conference");
const Venue = require("../models/venues");
const dateFormater = require("../util/dateFormater");
const formatDateTimeConferences = require("../util/dateFormater");
const collisionCheck = require("../util/collisionCheck");
const e = require("express");

exports.getIndex = (req, res, next) => {
    Conference.find().populate("address").then(conferences => {
        const formatDateTime = dateFormater(conferences);
        res.render("index", {
            pageTitle: "Welcome to conferences",
            isLoggedIn: req.session.isLoggedIn,
            path: '/',
            conferences: conferences,
            isLoggedIn: req.session.isLoggedIn,
            currentDate: req.date
        })
    }).catch(err => console.log(err))

}
exports.getConferences = (req, res, next) => {
    let errMessage = req.flash("error");

    if (errMessage.length > 0) {
        errMessage = errMessage[0]
    } else {
        errMessage = null
    }
    // let successMessage = req.flash("success");

    // if (successMessage.length > 0) {
    //     successMessage = successMessage[0]
    // } else {
    //     successMessage = null
    // }
    Conference.find().populate("address").then(conferences => {

        res.render("event-form", {
            pageTitle: "All conferences",
            isLoggedIn: req.session.isLoggedIn,
            path: '/all-conferences',
            conferences: conferences,
            currentDate: req.date,
            errorMessage: errMessage
        })
    }).catch(err => console.log(err))

}
exports.getConferenceDetails = (req, res, next) => {

    const confId = req.params.conferenceId;
    Conference.findOne({ _id: confId }).populate("address").then(conf => {
        ConferenceSession.find({ conferenceId: conf._id }).populate("hallId").then(sessions => {
            Hall.find().then(halls => {

                let pastSessions = [];
                
                const nowDate = new Date();
                
                for (var i = 0; i < sessions.length-1; i++) {
                    if(sessions[i].startTime-nowDate<0&&sessions[i].endTime-nowDate<0){
                        pastSessions.push(sessions[i]);
                    }
                }

                let activeSessions = [];

                for (var i = 0; i < sessions.length-1; i++) {
                    if(sessions[i].startTime-nowDate<0&&sessions[i].endTime-nowDate>0){
                        activeSessions.push(sessions[i]);
                    }
 
                 }
                
                let upcommingSessions = [];
                
                for (var i = 0; i < sessions.length-1; i++) {
                   if(sessions[i].startTime-nowDate>0){
                    upcommingSessions.push(sessions[i]);
                   }
                }

                console.log(pastSessions);

                res.render("conference-details", {
                    halls: halls || [],
                    pageTitle: conf.name,
                    isLoggedIn: req.session.isLoggedIn,
                    path: "/",
                    conference: conf,
                    allSessions: sessions || [],
                    pastSessions: pastSessions,
                    activeSessions:activeSessions,
                    upcommingSessions : upcommingSessions

                })
            })
        })

    }).catch(err => console.log(err))
}

    //sessions = sessions.map(e => {
    //     const startTime = e.startTime.toString().substring(0, 21);
    //     const endTime = e.endTime.toString().substring(0, 21);
    //     return {
    //         _id: e._id,
    //         venueId: e.venueId,
    //         sessionSeats: e.sessionSeats,
    //         conferenceId: e.conferenceId,
    //         hallId: e.hallId,
    //         startTime: startTime,
    //         endTime: endTime
    //     }
    // })
