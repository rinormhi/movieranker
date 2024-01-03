// middlewares.js

const prepareHeader = (req, res, next) => {
    res.locals.username = req.session.username || null; // Füge den Benutzernamen zu locals hinzu
    res.locals.loggedIn = req.session.loggedIn || false; // Füge den Benutzernamen zu locals hinzu
    req.session.loggedIn = false;
    next();
};

module.exports = { prepareHeader };
