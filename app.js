const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require('mongoose');
// require('dotenv/config');

const app = express();

const userRoutes = require("./routes/user");
const { CLIENT_RENEG_LIMIT } = require("tls");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes)


mongoose.connect(
    "mongodb+srv://banea9:stonnerexe95@conference-scheduler.m9skm.mongodb.net/conference?retryWrites=true&w=majority",
     { useNewUrlParser: true, useUnifiedTopology: true}
     )
.then(result => {
    console.log("Connected to DB")
    app.listen(3000)
}).catch(err => console.log(err))

// mongoose.connect(

//     process.env.DB_CONNECTION, {
//         useUnifiedTopology: true, 
//         useNewUrlParser: true,
//     }, 
//      )

// .then(result => {
//     app.listen(3000)
// }).catch(err => console.log(err))
