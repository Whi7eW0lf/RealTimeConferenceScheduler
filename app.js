const express = require("express");

const app = express();
const userRoutes = require("./routes/user")
app.set("view engine", "ejs");
app.set("views", "views");

app.use(userRoutes)


app.listen(3000, () => {
    console.log("Connected")
})