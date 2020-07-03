const mongoose = requite("mongoose");

const Schema = mongoose.Schema;

const speakerSchema = new speakerSchema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    profilePhoto: {type: String, required: true} 
    
});

module.exports = mongoose.model("speaker", speakerSchema)