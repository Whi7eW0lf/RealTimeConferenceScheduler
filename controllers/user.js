exports.getLogin = (req, res, next) => {
    res.render("login", {pageTitle: 'Login page', path: "/"})
}
exports.getSignIn = (req, res, next) => {
    res.render("signup", {pageTitle: 'Login page', path: "/"})
}
exports.getConferences = (req, res, next) => {
    res.render("event-form", {pageTitle: 'Login page', path: "/"})
}
exports.addSpeaker = (req, res, next) => {
    res.render("add-speaker", {pageTitle: 'Add speaker', path: "/"})
}
exports.addVenue = (req, res, next) => {
    res.render("add-venue", {pageTitle: 'Add venue', path: "/"})
}
exports.addConference = (req, res, next) => {
    res.render("add-conference", {pageTitle: 'Add conference', path: "/"})
}
