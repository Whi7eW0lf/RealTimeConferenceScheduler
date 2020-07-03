const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hallSchema = new Schema({
    name : {type: String, required = true},
    seats: {type: Number, required = true}
});

module.exports = mongoose.model("hall", orderSchema);

//Add to git

