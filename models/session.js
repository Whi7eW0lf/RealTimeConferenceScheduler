const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conferenceSessionSchema = new Schema({
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
    sessionSeats: {
        type: Number,
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
