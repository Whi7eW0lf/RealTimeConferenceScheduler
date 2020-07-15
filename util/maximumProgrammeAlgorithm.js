

function startAlgorithm(conferenceSessions,userSessions){

    let posibleSessions = [];

    for(const session of conferenceSessions){
        posibleSessions = checkForFreeTimeSpacesInUser(session,userSessions,posibleSessions);
        
    }

    return posibleSessions;
}

function checkForFreeTimeSpacesInUser(session,userSessions,posibleSessions){

    let date = new Date();
    let date2 = new Date('1996-10-17T03:24:00');

    isBefore(date,date2);
    isAfter(date,date2)

}

function isBefore(dateA,dateB){

   

    return false;
}

function isAfter(dateA,dateB){

    

    return false;
}

module.exports = startAlgorithm;