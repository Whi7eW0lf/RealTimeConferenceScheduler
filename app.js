const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require('mongoose');

// const dotenv = require("dotenv");
// require('dotenv/config');
const app = express();

const User = require("./models/user");

const userRoutes = require("./routes/user");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
    User.findById("5f01b42958989b1dd0878bef")
    .then(user => {
        req.user=user;
        next();
    })
    .catch(err => console.log(err));
})
app.use(userRoutes)


mongoose.connect("mongodb+srv://banea9:stonnerexe95@conference-scheduler.m9skm.mongodb.net/conference?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(result => {
    console.log("Connected to DB")
    User.findOne()
    .then((user) => {
        if (!user) {
            const user = new User({email: "test@test.com", password: "123"})
            return user.save()
        }
    })
    .then(() => {
        app.listen(3000)
    })
    .catch(err => console.log(err))
})
