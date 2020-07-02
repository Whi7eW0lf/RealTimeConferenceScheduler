const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conferenceSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
})