const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    res.render("login", {
        pageTitle: 'Login page',
        path: "/login"
    })
}
exports.getSignup = (req, res, next) => {
    res.render("signup", {
        pageTitle: 'Signup page',
        path: "/signup"
    })
}


exports.postLogin = (req, res, next) => {
    User.findById("5f01b42958989b1dd0878bef").then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
            console.log(err)
            res.redirect("/")
        })

    }).catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {

};
exports.postSignup = (req, res, next) => {

};
