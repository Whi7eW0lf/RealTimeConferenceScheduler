const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

const SpeakerSchema = new SpeakerSchema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    profilePhoto: {type: String, required: true} 
    
});

module.exports = mongoose.model("speaker", speakerSchema)