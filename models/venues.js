const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const venueSchema = new Schema({
    address: {
        type: String,
        required: true
    },

    
})

module.exports = mongoose.model("venue", venueSchema);