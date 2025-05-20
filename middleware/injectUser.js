// middleware/injectUser.js
module.exports = function (req, res, next) {
    if (req.session && req.session.user) {
        req.user = req.session.user;
        res.locals.user = req.session.user;
    }
    next();
};
