const express = require("express");
const router = express.Router();
const UserController = require("./controllers/UserController");
const PersonController = require("./controllers/PersonController");
const MovieController = require("./controllers/MovieController");
const SeriesController = require("./controllers/SeriesController");
const ViewController = require("./controllers/ViewController");
const Movie = require("./models/Movie");


const movie = new Movie();
const movieController = new MovieController();
const seriesController = new SeriesController();
const userController = new UserController();
const personController = new PersonController();
const viewController = new ViewController();

// ############################
// ######### HOMEPAGE #########
// ############################

router.get("/", async (req, res) => {
    // console.log("Username", req.session.username);
    // console.log("Login-Status: ", req.session.loggedIn);
    // console.log(req.session);
    await viewController.displayHomepage(req, res);
    // Überprüfung, ob Sitzungsdaten vorhanden sind
})

// ####################################
// ######### REGISTER & LOGIN #########
// ####################################

router.get("/register", (req, res) => {
    res.locals.errorMessage = req.query.error;
    res.render("register.ejs");
});

router.post("/register-submit", function (req, res) {
    const { uname, pwd, cpwd, email } = req.body;

    const registerSuccess = userController.registerUser(uname, pwd, cpwd, email, res);
    // if (registerSuccess) {
    //     console.log("Registrierung erfolgreich");
    // } else {
    //     console.log("Registrierung nicht erfolgreich");
    // }
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login-submit", (req, res) => {
    let uname = req.body.uname;
    let pwd = req.body.pwd;
    userController.loginUser(uname, pwd, req, res);
});

router.get("/abmelden", (req, res) => {
    userController.signOut(req, res);
})

// router.get("/movies", (req, res) => {
//     viewController.displayAllMovies(req, res);
// });

// ##########################
// ######### MOVIES #########
// ##########################

function extractProviderId(inputString) {
    const regex = /providerId=(.*?)(&|$)/;
    const match = inputString.match(regex);
    // Wenn ein Treffer gefunden wurde
    if (match) {
        // match[1] enthält den Teil zwischen "providerId=" und "&"
        return match[1];
    }
    // Wenn kein Treffer gefunden wurde
    return null;
}

router.get("/filter-movies", (req, res) => {

    const genres = req.query.genres || [];
    const providers = req.query.providers || [];
    const sortby = req.query.sortby || "popularity.desc";
    const monetization_type = req.query.monetization_type || '';
    const minYear = req.query.minYear || "1990";
    const maxYear = req.query.maxYear || "2023";

    const options = {
        "genres": genres,
        "providers": providers,
        "sortby": sortby,
        "monetization": monetization_type,
        "minYear": minYear,
        "maxYear": maxYear
    }

    viewController.renderFilteredMoviesOnClient(options, req, res);
})


router.get("/load-more-movies", (req, res) => {
    const genres = req.query.genres || '';
    const providers = req.query.providers || '';
    const sortby = req.query.sortby || "popularity.desc";
    const monetization_type = req.query.monetization_type || '';
    const minYear = req.query.minYear || "1990";
    const maxYear = req.query.maxYear || "2023";
    const pages = req.query.pages;

    const options = {
        "genres": genres,
        "providers": providers,
        "sortby": sortby,
        "monetization": monetization_type,
        "pages": pages,
        "minYear": minYear,
        "maxYear": maxYear
    }
    viewController.loadMoreMovies(options, req, res);
});

router.get('/movies', (req, res) => {
    const genres = req.query.genres || '';
    const providers = req.query.providers || [];
    const sortby = req.query.sortby || "popularity.desc";
    const monetization_type = req.query.monetization_type || '';
    const minYear = req.query.minYear || "1990";
    const maxYear = req.query.maxYear || "2023";

    const options = {
        "genres": genres,
        "providers": providers,
        "sortby": sortby,
        "monetization": monetization_type,
        "minYear": minYear,
        "maxYear": maxYear
    }

    viewController.displayMovies(options, req, res)
});

router.get("/movies/genre/:genre", (req, res) => {
    const genre = req.params.genre;
    viewController.displayAllMoviesFromGenre(genre, req, res);
});

router.get("/movies/genre/:genre/on/:watchProvider/by/:sortOption", (req, res) => {
    const genre = req.params.genre;
    const watchProvider = req.params.watchProvider;
    const sortOption = req.params.sortOption || "popularity";

    const options = {
        "genre": genre,
        "watch-provider": watchProvider,
        "sort-option": sortOption
    }
    viewController.displayMovies(options)
})

router.get("/movies/page/:pageNumber", (req, res) => {
    const pageNumber = req.params.pageNumber;
    viewController.displayMoviesNextPage(pageNumber, req, res);
})

router.post("/search-results", (req, res) => {
    const query = req.body.query;
    viewController.searchMovies(query, req, res);
})

router.get("/serien", (req, res) => {
    viewController.displayAllSeries(req, res);
})

router.get("/movies/:movieId", (req, res) => {
    const movieId = req.params.movieId;
    viewController.showMoviePage(movieId, req, res);
})

// ##########################
// ######### USERS ##########
// ##########################

router.get("/person/:personId", (req, res) => {
    const personId = req.params.personId;
    viewController.showPersonPage(personId, req, res);
})

router.get("/profil", (req, res) => {
    res.render("profile.ejs")
})

router.get("/mitglieder", (req, res) => {
    viewController.displayMembersPage(req, res);
})

// #########################
// #########################
// #########################

module.exports = router;