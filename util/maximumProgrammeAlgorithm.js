


function startAlgorithm(conferenceSessions, userSessions) {

    let posibleSessions = [];

    let sortedConferenceSessions = sortSessions(conferenceSessions);
    let sortedUserSessions = sortSessions(userSessions);

    for (const session of sortedConferenceSessions) {

        if(checkForFreeTimeSpacesInUser(session, sortedUserSessions, posibleSessions)){

            sortedUserSessions.push(session);
            posibleSessions.push(session);
            sortedUserSessions = sortSessions(sortedUserSessions);

        }
        
    }

    return posibleSessions;
}

function checkForFreeTimeSpacesInUser(session, userSessions) {

    
    let lenght = Object.keys(userSessions).length;

    if(lenght===0){
        return true;
    }

    if(session.sessionSeats-1<0){
        return false;
    }

    for (let i = 0; i < lenght; i++) {
        
        if (isAfter(session.startTime, userSessions[i].endTime) && isBefore(session.endTime, userSessions[i].startTime)) {
            return true;
            break;
        } else if (isBefore(session.startTime, userSessions[i].startTime) && i === 0) {
            return true;
            break;
        } else if (isAfter(session.startTime, userSessions[i].startTime && i === userSessions.lenght - 1)) {
            if (isAfter(session.startTime, userSessions[i].endTime)) {
                return true;
                break;
            }
        }else if(isEquals(session.endTime,userSessions[i].startTime)||isEquals(session.startTime,userSessions.endTime)){
            return true;
            break;
        }
        

    }

}

function sortSessions(sessions) {

    if(sessions===undefined){
        return [];
    }

    return sessions.sort((a, b) => a.startTime - b.endTime);
}

function isBefore(dateA, dateB) {

    return dateA - dateB < 0;
}

function isEquals(dateA, dateB) {

    return dateA - dateB == 0;
}

function isAfter(dateA, dateB) {

    return dateA - dateB > 0;
}



module.exports = startAlgorithm;