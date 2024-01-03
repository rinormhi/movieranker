class User {
    constructor(fname, lname, uname, pwd, cpwd, email, pnumber) {
        this.fname = "Heinz";
        this.lname = "Peter";
        this.uname = "hpr1337";
        this.pwd = "1234";
        this.cpwd = "1234";
        this.email = "hp@web.de";
        this.pnumber = "0152993821";
        this.id = this.generateUniqueId();
        this.favoriteMovies = [];
    }

    // Private Methode zur Generierung einer 10-stelligen ID
    generateUniqueId() {
        return Math.random().toString(36).substr(2, 10);
    }

    // Methode zum Hinzufügen eines Films zur Lieblingsfilmliste
    addToFavoriteMovies(movie) {
        this.favoriteMovies.push(movie);
        console.log(`${movie} wurde zu den Lieblingsfilmen hinzugefügt.`);
    }

    // Methode zum Entfernen eines Films aus der Lieblingsfilmliste
    removeFromFavoriteMovies(movie) {
        const index = this.favoriteMovies.indexOf(movie);
        if (index !== -1) {
            this.favoriteMovies.splice(index, 1);
            console.log(`${movie} wurde aus den Lieblingsfilmen entfernt.`);
        } else {
            console.log(`${movie} ist nicht in den Lieblingsfilmen.`);
        }
    }

    // Methode zur Anzeige der Lieblingsfilme
    displayFavoriteMovies() {
        console.log(`${this.firstName} ${this.lastName}'s Lieblingsfilme:`);
        this.favoriteMovies.forEach(movie => {
            console.log(movie);
        });
    }
}

// User input in register form

let fname = "Heinz";
let lname = "Peter";
let uname = "hpr1337";
let pwd = "1234";
let cpwd = "1234";
let email = "hp@web.de";
let pnumber = "0152993821";

let user = new User(fname, lname, uname, pwd, cpwd, email, pnumber);

const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Benutzerdatenbank"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    let x = con.query(`
    INSERT INTO users(
        firstName, 
        lastName, 
        username, 
        phoneNumber, 
        email, 
        password) 
    VALUES(
        '${user.fname}', 
        '${user.lname}', 
        '${user.uname}', 
        '${user.pnumber}', 
        '${user.email}', 
        '${user.pwd}'
        );`, (err) => {
        if (err) throw err;
        console.log("Erfolgreich hinzugefügt");
    });
});

// module.exports = User;