// UserController.js (Controller)
const User = require('../models/User');

class UserController {
    // createUser(uname, pwd, cpwd, email, callback) {
    //     const user = new User(uname, pwd, cpwd, email);

    //     user.saveToDatabase((err) => {
    //         if (err) {
    //             console.error("Fehler beim Hinzufügen des Benutzers:", err);
    //             callback(err);
    //         } else {
    //             console.log("Benutzer " + user.uname + " erfolgreich hinzugefügt");
    //             callback(null, user);
    //         }
    //     });
    // }

    async loginUser(uname, pwd, req, res) {
        try {
            const user = new User();
            const loginTrue = await user.login(uname, pwd);

            if (loginTrue) {
                req.session.username = uname;
                req.session.loggedIn = true;
                res.redirect("/");
            } else {
                console.log("Login fehlgeschlagen");
            }
        }
        catch (error) {
            console.log("loginUser Error: " + error);
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

    async registerUser(uname, pwd, cpwd, email, res) {
        try {
            const user = new User();
            const userExists = await user.checkIfUserExists(uname, email);

            if (userExists) {
                console.log("Benutzer existiert bereits");
                // TODO: Handle this
            } else {
                const validateRegisterInput = await user.validateRegisterInput(uname, pwd, cpwd, email);

                if (validateRegisterInput === "valid") {
                    // Benutzer in Datenbank speichern
                    user.insertUserIntoDatabase(uname, pwd, email);
                    console.log(uname, "Register Success");
                    res.redirect("/")
                } else {
                    console.log(uname, "Values not okay");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    // changePassword(uname, pwd, newPwd) {
    //     // Datenbankabfrage: Suche nach dem User und seinem zugehörigen Passwort
    //     const user = new User();
    //     user.getSqlRow(uname).then(result => {
    //         if (result[0].password = pwd) {
    //             user.updatePassword(newPwd, uname);
    //         } else {
    //             console.log("Passwort falsch");
    //         }
    //     }).catch(err => {
    //         console.error(err);
    //     });
    // }

    // async login(uname, pwd, req, res) {
    //     try {
    //         let user = new User();
    //         let authentication = await user.tryToLogin(uname, pwd)
    //             .then(result => {
    //                 console.log(result);
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             })

    //     }
    //     catch (error) {
    //         console.log("Login Error: " + error);
    //     }
    // }
}
module.exports = UserController;