const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    conferenceOwner: {
        conferences: [
            {
                confereneId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Conference'
                }
            }
        ]
    },
    conferenceAttendee: {
        conferences: [
            {
                confereneId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Conference'
                }
            }
        ]
    }

});

module.exports = mongoose.model("Speaker", userSchema)
