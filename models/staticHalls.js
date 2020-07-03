const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const venueSchema = new Schema({
    adress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    

    
})

module.exports = mongoose.model("venue", venueSchema);