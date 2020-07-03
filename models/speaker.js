const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

const speakerSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    profilePhoto: {type: String, required: true} 
    
});

module.exports = mongoose.model("Speaker", speakerSchema)