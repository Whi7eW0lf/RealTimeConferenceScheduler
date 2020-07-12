const Hall = require("../models/hall");


async function checkExistingHall(venueId, name) {
    let isExisting = false;
    let resp = await Hall.find({venueId: venueId}).then(halls => {
        return halls
    });
    // console.log(resp);
    // let halls = await 
    for(let hall of resp) {
        if(hall.name === name) {
            isExisting = true;
        }
    }
    return isExisting
}
module.exports = checkExistingHall;
