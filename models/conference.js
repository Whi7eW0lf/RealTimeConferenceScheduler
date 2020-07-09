const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conferenceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
    address: {
        type: Schema.Types.ObjectId,
        ref: "Venue",
        required: true
    },
    speakerName: {
        type: String,
        required: true
    },
    speakerDescription: {
        type: String,
        required: true
    },
    speakerImg: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }


})

module.exports = mongoose.model("Conference", conferenceSchema);
