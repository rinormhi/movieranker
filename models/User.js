const con = require("../db");
const bcrypt = require("bcrypt")


class User {

    login(uname, pwd) {
        const query = `SELECT password FROM users WHERE username = ?`;
        return new Promise((resolve, reject) => {
            con.query(query, [uname], (error, elements) => {
                if (error) {
                    console.log("Query Error: " + error);
                    reject(false);
                } else {
                    let hashed = elements[0].password;
                    bcrypt.compare(pwd, hashed, (err, result) => {
                        if (result == true) {
                            resolve(true);
                        } else {
                            resolve(false)
                        }
                    })
                }
            })
        })
    }

    getAllUsers() {
        const query = `SELECT * FROM users`;
        return new Promise((resolve, reject) => {
            con.query(query, (error, elements) => {
                if (error) {
                    console.log("Query Error: " + error);
                    reject(false)
                } else {
                    const members = elements;
                    resolve(members);
                }
            })
        })
    }
    checkIfUserExists(uname, email) {
        const query = `SELECT username, email FROM users WHERE username = "${uname}" OR email = "${email}"`;
        return new Promise((resolve, reject) => {
            con.query(query, (error, elements) => {
                if (error) {
                    return reject(error);
                } else {
                    if (elements.length === 0) {
                        resolve(false)
                    } else {
                        resolve(true);
                    }
                }
            })
        })
    }

    validateRegisterInput(uname, pwd, cpwd, email) {
        let validationlevel = 0;
        let errorMessage = "";
        return new Promise((resolve, reject) => {

            // PW Validaton

            if (pwd != cpwd) {
                errorMessage += "<p class='error'>Passwörter stimmen nicht überein.</p>";
                // resolve("Passwörter stimmen nicht überein.")
            } else {
                validationlevel++;
            }

            if (pwd.length < 6) {
                errorMessage += "<p class='error'>Passwort muss mind. 6 Zeichen beinhalten.</p>";
                // resolve("Passwort muss mind. 6 Zeichen beinhalten")
            } else {
                validationlevel++;
            }

            // Email Validaton

            let emailValid = (email => {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(email);
            });

            if (emailValid) {
                validationlevel++;
            } else {
                errorMessage += "<p class='error'>Die E-Mail ist nicht korrekt.</p>";

                // resolve("Email nicht korrekt");
            }

            // Username Validation

            if (uname.length < 5) {
                errorMessage += "<p class='error'>Dein Passwort muss mindestens 5 Zeichen beinhalten.</p>";

                // resolve("PW muss mindestens 5 Zeichen beinhalten");
            } else {
                validationlevel++;
            }

            if (validationlevel == 4) {
                resolve("valid");
            } else {
                reject(errorMessage);
            }

        })
    }

    insertUserIntoDatabase(uname, pwd, email) {
        let hashed;
        this.hashPassword(pwd)
            .then(response => {
                hashed = response;
                const query = `INSERT INTO users(username, password, email) VALUES("${uname}","${hashed}","${email}");`;
                con.query(query, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Erfolgreich");
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    async comparePassword(plaintextPassword, hash) {
        const result = await bcrypt.compare(plaintextPassword, hash);
        return result;
    }

    async hashPassword(plaintextPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(plaintextPassword, 10)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

}

module.exports = User;
