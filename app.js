const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");
const cors = require('cors');
const path = require("path");
const mime = require("mime-types");
const parser = require("node-html-parser");
const session = require("express-session");
const { prepareHeader } = require('./middleware.js');

app.use(session({
    secret: 'X72c20d+-', // Ein Geheimnis zur sicheren Signierung der Sitzungsinformationen
    resave: false, // Legt fest, ob die Sitzung bei jeder Anforderung erneut gespeichert werden soll, auch wenn sie nicht geändert wurde
    saveUninitialized: true // Legt fest, ob eine neue, jedoch nicht initialisierte Sitzung gespeichert werden soll
}));

app.use(prepareHeader); // Registriere die Middleware

// const User = require('./models/User');

app.set("view engine", "ejs");
app.use(cors());
// app.use(express.static("/Users/rinor/Programmierung/node-js/projekt1/public"));
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.listen(port, function () {
    console.log("App listening on Port " + port);
});

// app.get("/", function (req, res) {
//     console.log(req.body);
//     res.render("home.ejs");
// });

// app.post('/tutorials/main', function (req, res) {
//     console.log(req.body.fname);
//     res.send('Hello from POST!');
// });

// app.get("/register", (req, res) => {
//     res.locals.errorMessage = req.query.error;
//     res.render("register.ejs");
// });

// Ist notwendig, damit der User-Input gelesen werden kann
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/register-submit', function (req, res) {
//     console.log(req.body);
//     const { firstname, lastname, uname, pwd, cpwd, email, pnumber } = req.body;

//     const userController = new UserController();

//     userController.createUser(firstname, lastname, uname, pwd, cpwd, email, pnumber, (err, user) => {
//         if (err) {
//             res.status(500).send('Internal Server Error');
//         } else {
//             res.send(`Benutzer ${user.fname} ${user.lname} erfolgreich erstellt`);
//         }
//     });
// });
