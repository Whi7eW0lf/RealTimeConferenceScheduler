const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();

const userRoutes = require("./routes/user")

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes)


mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true, 
        useNewUrlParser: true,
    }, 
     )
.then(result => {
    app.listen(3000)
}).catch(err => console.log(err))
