// app.js
const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('../controllers/User-Controller');


const app = express();
const port = 3000;

// Ist notwendig, damit der User-Input gelesen werden kann
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/tutorials/main', function (req, res) {
    console.log(req.body);
    const { fname, lname, uname, pwd, cpwd, email, pnumber } = req.body;

    const userController = new UserController();

    userController.createUser(fname, lname, uname, pwd, cpwd, email, pnumber, (err, user) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.send(`Benutzer ${user.fname} ${user.lname} erfolgreich erstellt`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
