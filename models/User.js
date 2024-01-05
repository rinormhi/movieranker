const { valid } = require("node-html-parser");
const con = require("../db");
const bcrypt = require("bcrypt")



class User {

    login(uname, pwd) {
        const query = `SELECT password FROM users WHERE username = ?`;
        return new Promise((resolve, reject) => {
            con.query(query, [uname], (error, elements) => {
                if (error) {
                    console.log("Query Error: " + error);
                    reject(error);
                } else {
                    let hashed = elements[0].password;
                    bcrypt.compare(pwd, hashed, (err, result) => {
                        if (result == true) {
                            resolve(true);
                        } else {
                            reject("Falsches Password")
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
                        reject("Benutzer existiert nicht")
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

            // Username Validation

            if (uname.length > 10) {
                errorMessage += "Benutzername darf max. 10 Zeichen beinhalten. ";
            } else {
                validationlevel++;
            }

            // PW Validation
            if (pwd != cpwd) {
                errorMessage += "Passwörter stimmen nicht überein. ";
            } else {
                validationlevel++;
            }

            if (pwd.length < 6) {
                errorMessage += "Passwort muss mind. 6 Zeichen beinhalten. ";
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
                errorMessage += "Die E-Mail ist nicht korrekt. ";
            }

            // Username Validation
            if (uname.length < 5) {
                errorMessage += "Dein Passwort muss mindestens 5 Zeichen beinhalten. ";
            } else {
                validationlevel++;
            }

            if (validationlevel == 5) {
                resolve(true);
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
