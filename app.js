const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require('mongoose');
const app = express();

const userRoutes = require("./routes/user")

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes)


mongoose.connect("mongodb+srv://banea9:stonnerexe95@conference-scheduler.m9skm.mongodb.net/conference?retryWrites=true&w=majority")
.then(result => {
    console.log(result)
    app.listen(3000)
}).catch(err => console.log(err))
