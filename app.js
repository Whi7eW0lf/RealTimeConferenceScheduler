const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require('mongoose');
const session = require("express-session");
const MondoDBSession = require("connect-mongodb-session")(session);
const MONDODB_URI = "mongodb+srv://banea9:stonnerexe95@conference-scheduler.m9skm.mongodb.net/conference?retryWrites=true&w=majority";
// const dotenv = require("dotenv");
// require('dotenv/config');
const app = express();
const store = new MondoDBSession({uri: MONDODB_URI, collection: "loginsessions"})
const User = require("./models/user");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/authentication");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}))


app.use(userRoutes)
app.use(authRoutes)

mongoose.connect(MONDODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(result => {
    console.log("Connected to DB")
    User.findOne().then((user) => {
        if (!user) {
            const user = new User({email: "test@test.com", password: "123"})
            return user.save()
        }
    }).then(() => {
        app.listen(3000)
    }).catch(err => console.log(err))
})
