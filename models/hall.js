const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hallSchema = new Schema({
    name : {type: String, required: true},
    seats: {type: Number, required: true},
    hallSession: {
        sessions: [
            {
                sessionId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Session'
                }
            }
        ]
    },
    venueId: {
        type: Schema.Types.ObjectId,
        ref: "Venue",
        required: true
    }
});

module.exports = mongoose.model("Hall", hallSchema);


