const Movie = require("../models/Movie");
const parser = require("node-html-parser");

class MovieController {

    async displayHomepage(req, res) {
        try {
            let movie = new Movie();
            const movies = await movie.getPopularMovies();
            const popularMovies = await movie.getUpcomingMovies();
            res.render("home", { movies: movies.results, popularMovies: popularMovies });
        } catch (error) {
            console.error("Error: " + error)
            res.render("home", { error: "Fehler" })
        }
    }

    async displayAllMovies(req, res) {
        try {
            let movie = new Movie();
            let pages = [1, 2, 3];
            let pageNumber = 1;
            const movies = await movie.getAllMovies(pages);
            res.render("movies", { movies: movies, pageNumber: pageNumber });
        } catch (error) {
            console.error("Error: " + error)
            res.render("movies", { error: "Fehler" })
        }
    }

    async displayMoviesNextPage(pageNumber, req, res) {
        try {
            let pages = [];
            for (let i = 0; i < 3; i++) {
                pages.push(pageNumber + i * 3)
            }
            let movie = new Movie();
            const movies = await movie.getAllMovies(pages);
            res.render("movies", { movies: movies, pageNumber: pageNumber });
        } catch (error) {
            console.error("Error: " + error)
            res.render("movies", { error: "Fehler" })
        }
    }

    async searchMovies(query, req, res) {
        try {
            let movie = new Movie();
            const movies = await movie.getSearchResults(query);
            res.render("search-results", { movies: movies.results });
        } catch (error) {
            console.error("Error: " + error)
            res.render("search-results", { error: "Fehler bei der Suche" });
        }
    }

    async showMoviePage(id, req, res) {
        try {
            let movie = new Movie();
            let movieInfo = await movie.getMovieInformation(id);
            let director = await movie.getMovieDirector(id);
            let purchaseProviders;
            let rentalProviders;
            let streamingProviders;
            let reviews = await movie.getReviews(id)
                .then(reviews => {
                    return reviews.results;
                })
                .catch(err => {
                    return "";
                })

            parser
            let providers = await movie.getProviders(id)
                .then(providers => {
                    purchaseProviders = providers.buy;
                    rentalProviders = providers.rent;
                    streamingProviders = providers.flatrate;
                })
                .catch(err => {
                    return "";
                })
            let actors = await movie.getMovieArtists(id);
            let crew = await movie.getMovieCrew(id);
            let trailer = await movie.getTrailer(id)
                .then(result => {
                    return result;
                })
                .catch(error => {
                    console.error("Trailer-Error: " + error)
                })



            res.render("movie", {
                movieRes: movieInfo,
                dir: director,
                purchaseProviders: purchaseProviders,
                rentalProviders: rentalProviders,
                streamingProviders: streamingProviders,
                actors: actors,
                crew: crew,
                trailer: trailer,
                reviews: reviews
            });
        } catch (error) {
            console.error("Show-Movie-Page-Error: " + error)
            res.render("movie", { error: "Fehler" });
        }
    }


}

module.exports = MovieController;