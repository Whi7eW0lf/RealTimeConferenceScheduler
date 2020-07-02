const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require('mongoose');
const mongoConnect = require("./util/database");
const app = express();
const userRoutes = require("./routes/user")
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes)

mongoConnect(() => {
    app.listen(3000)
})