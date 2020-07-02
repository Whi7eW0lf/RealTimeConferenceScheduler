exports.getLogin = (req, res, next) => {
    res.render("login", {pageTitle: 'Login page'})
}
