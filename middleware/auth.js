const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        // Add user to request object for easy access
        req.user = req.session.user;
        return next();
    }
    res.redirect('/user/userLogin');
};

module.exports = {
    isAuthenticated
}; 