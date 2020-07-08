const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conferenceSessionSchema = new Schema({
    venueId: {
        type: Schema.Types.ObjectId,
        ref: 'Speaker',
        required: true
    },
    speakerId: {
        type: Schema.Types.ObjectId,
        ref: 'Speaker',
        required: true
    },
    conferenceId: {
        type: Schema.Types.ObjectId,
        ref: 'Conference',
        required: true
    },
    hallId: {
        type: Schema.Types.ObjectId,
        ref: 'Hall',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    
})

module.exports = mongoose.model("ConferenceSession", conferenceSessionSchema); 
