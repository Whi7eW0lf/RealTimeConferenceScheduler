function startAlgorithm(conferenceSessions,userSessions){

    let posibleSessions = [];

    console.log(isBefore(new Date(),new Date()));

    for(session of conferenceSessions){
        posibleSessions = checkForFreeTimeSpacesInUser(session,userSessions,posibleSessions);
    }
}

function checkForFreeTimeSpacesInUser(session,userSessions,posibleSessions){

}

function isBefore(dateA,dateB){

    let date = new Date();

    console.log(date);

    return false;
}

module.exports = startAlgorithm;