const User = require("../models/user");
const bcrypt = require("bcryptjs");
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
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
        //   req.flash("error", "Invalid email or password...");
          return res.redirect("/login");
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user; 
              return req.session.save(err => {
                console.log(err);
                res.redirect("/");
              });
            }
            // req.flash("error", "Invalid email or password...");
            req.session.save(err => {
              res.redirect("/login");
            });
          })
          .catch(err => {
            console.log(err);
            res.redirect("/login");
          });
      })
      .catch(err => console.log("postLogin error"));
  };
  
exports.postLogout = (req, res, next) => {

};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const role = req.body.role;
    User.findOne({ email: email })
      .then(userDoc => {
        if (userDoc) {
        //   req.flash(
        //     "existingEmail",
        //     "This email has already been used to create registration."
        //   );
          return req.session.save(err => {
            res.redirect("/signup");
          });
        }
        return bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            const user = new User({
              email: email,
              password: hashedPassword,
              role: role,
              conferenceOwner: {conferences: []},
              conferenceAttendee: {conferences: []}
            });
            return user.save();
          })
          .then(result => {
            res.redirect("/login");
          });
      })
      .catch(err => console.log(err));
  };