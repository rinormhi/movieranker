// UserController.js (Controller)
const User = require('../models/User');

class UserController {

    async registerUser(uname, pwd, cpwd, email, res) {
        try {
            const user = new User();
            const userExists = await user.checkIfUserExists(uname, email);

            if (userExists) {
                console.log("Benutzer existiert bereits");

                res.render('register', { error: "Benutzer existiert bereits" });
            } else {

                const validateRegisterInput = await user.validateRegisterInput(uname, pwd, cpwd, email);
                if (validateRegisterInput === true) {
                    // Benutzer in Datenbank speichern
                    user.insertUserIntoDatabase(uname, pwd, email);
                    console.log(uname, "Register Success");
                    res.redirect("/")
                }
            }
        } catch (error) {
            console.log(error);
            res.render('register', { error: error });

        }
    }

    async loginUser(uname, pwd, req, res) {
        try {
            const user = new User();
            await user.checkIfUserExists(uname);
            const loginTrue = await user.login(uname, pwd);

            if (loginTrue) {
                req.session.username = uname;
                req.session.loggedIn = true;
                res.redirect("/");
            } else {
                res.render('login', { error: error });
                console.log("Login fehlgeschlagen");
            }
        }
        catch (error) {
            console.log("loginUser Error: " + error);
            res.render('login', { error: error });

        }
    }


    signOutUser(req, res) {
        try {
            req.session.destroy();
            res.redirect("/");

        }
        catch (error) {
            console.log(error);
        }
    }

    async displayAllUsers() {
        try {
            const user = new User();
            const members = await user.getAllUsers();
            return members;
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserController;