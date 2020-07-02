const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require('mongoose');

const app = express();
const userRoutes = require("./routes/user")
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes)

mongoose.connect("mongodb+srv://banea9:stonnerexe95@conference.uwatr.mongodb.net/<dbname>?retryWrites=true&w=majority")

app.listen(3000, () => {
    console.log("Connected")
})