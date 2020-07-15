const session = require("express-session");

function startAlgorithm(conferenceSessions,userSessions){

    let posibleSessions = [];

    for(session of conferenceSessions){
        posibleSessions = checkForFreeTimeSpacesInUser(session,userSessions,posibleSessions);
    }
}

function checkForFreeTimeSpacesInUser(session,userSessions,posibleSessions){

}

module.exports = startAlgorithm;