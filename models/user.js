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
    role: {
        type:String,
        required: true
    },
    conferenceOwner: {
        conferences: [
            {
                conferenceId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Conference'
                }
            }
        ]
    },

    conferenceAttendee: {
        conferences: [
            {
                conferenceId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Conference'
                }
            }
        ]
    }

});

userSchema.methods.addToConfOwner = function (conference) {
    this.conferenceOwner.conferences.push(conference);
    return this.save()
}


module.exports = mongoose.model("User", userSchema)
