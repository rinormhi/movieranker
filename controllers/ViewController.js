const Movie = require("../models/Movie");
const User = require("../models/User");
const Person = require("../models/Person");
const parser = require("node-html-parser");
const UserController = require("../controllers/UserController");

class ViewController {
    async displayMovies(options, req, res) {
        try {
            const genres = options.genres || [];
            const providers = options.providers || [];
            const sortby = options.sortby || "popularity.desc";
            const monetization = options.monetization || "";
            const minYear = options.minYear || "1990";
            const maxYear = options.maxYear || "2023";
            const pageNumber = 1;
            const movie = new Movie();
            const pages = [1, 2, 3];
            const movies = await movie.getMovies(pages, genres, providers, sortby, monetization, minYear, maxYear);
            const providerList = await movie.getAllProviders();

            res.render("movies", {
                movies: movies,
                pageNumber: pageNumber,
                providers: providerList,
                pages: pages
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    async displayMoreMovies(options, req, res) {
        try {
            const genres = options.genres || [];
            const providers = options.providers || [];
            const sortby = options.sortby || "popularity.desc";
            const monetization = options.monetization || "";
            const pageNumber = 1;
            const movie = new Movie();
            const pages = [1, 2, 3];
            const movies = await movie.getMovies(pages, genres, providers, sortby, monetization);
            const providerList = await movie.getAllProviders();

            res.render("movies", {
                movies: movies,
                pageNumber: pageNumber,
                providers: providerList,
                pages: pages
            })
        } catch (err) {
            console.log(err);
        }

    }

    async loadMoreMovies(options, req, res) {

        try {
            const genres = options.genres || [];
            const providers = options.providers || [];
            const sortby = options.sortby || "popularity.desc";
            const monetization = options.monetization || "";
            const minYear = options.minYear || "1990";
            const maxYear = options.maxYear || "2023";
            const pages = options.pages;
            const movie = new Movie();

            const movies = await movie.getMovies(pages, genres, providers, sortby, monetization, minYear, maxYear);

            let html = ""
            movies.forEach(movie => {
                html += `
                <div class="movie-wrapper">
                <div id="${movie.id}" class="movie">
                    <div class="tooltip movie-title">
                    ${movie.title}
                    </div>
                    <a title="${movie.title} - (${movie.release_date})" href="/movies/${movie.id}">
                        <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="">
                    </a>
                    <div class="like-btn">
                        +
                    </div>
                    <div class="score">
                      ${Math.floor(movie.vote_average * 10) / 10}
                    </div>
                  </div>
                </div>`
            });

            res.send(html);
        }
        catch (err) {
            console.log(err);
        }
    }
    async renderFilteredMoviesOnClient(options, req, res) {
        try {
            const genres = options.genres || [];
            const providers = options.providers || [];
            const sortby = options.sortby || "popularity.desc";
            const monetization = options.monetization || "";
            const minYear = options.minYear || "1990";
            const maxYear = options.maxYear || "2023";
            const pages = [1, 2, 3];
            const movie = new Movie();

            const movies = await movie.getMovies(pages, genres, providers, sortby, monetization, minYear, maxYear);

            let html = ""
            movies.forEach(movie => {
                html += `
                <div class="movie-wrapper">
                    <div id="${movie.id}" class="movie">
                        <div class="tooltip movie-title">
                        ${movie.title}
                        </div>
                        <a title="${movie.title} - (${movie.release_date})" href="/movies/${movie.id}">
                            <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="">
                        </a>
                        <div class="like-btn">
                            +
                        </div>
                        <div class="score">
                          ${Math.floor(movie.vote_average * 10) / 10}
                        </div>
                      </div>
                </div>`
            });

            res.send(html);
        }
        catch (err) {
            console.log(err);
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

    async showPersonPage(personId, req, res) {
        try {
            let person = new Person();
            let personInfo = await person.getPersonInformation(personId);
            let personSocials = await person.getPersonSocials(personId);
            let personMovies = await person.getPersonMovies(personId);
            res.render("person",
                {
                    personInfo: personInfo,
                    personSocials: personSocials,
                    personMovies: personMovies
                })
        }
        catch (error) {
            console.log("showPersonPage Error " + error);
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

            let providers = await movie.getProviders(id)
                .then(result => {
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
                trailer: trailer
            });
        } catch (error) {
            console.error("Show-Movie-Page-Error: " + error)
            res.render("movie", { error: "Fehler" });
        }
    }

    async displayMembersPage(req, res) {
        try {
            const userController = new UserController();
            const members = await userController.displayAllUsers();
            console.log(members);
            res.render("mitglieder", { members: members })
        }
        catch (error) {
            console.log("displayMembersPage: " + error);
        }
    }


    async displayHomepage(req, res) {
        try {
            let movie = new Movie();
            const movies = await movie.getPopularMovies();
            const popularMovies = await movie.getUpcomingMovies();
            const nowPlaying = await movie.getNowPlayingMovies();
            res.render("home", { movies: movies.results, popularMovies: popularMovies, nowPlaying: nowPlaying });
        } catch (error) {
            console.error("Error: " + error)
            res.render("home", { error: "Fehler" })
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





    async displayAllMoviesFromGenre(genre, req, res) {

        try {
            let pages = [1, 2, 3];
            let pageNumber = 1;
            let movie = new Movie();
            const genreId = this.getGenreId(genre);
            const genreMovies = await movie.getMoviesFromGenre(genreId);
            const providers = await movie.getAllProviders();
            res.render("movies", { movies: genreMovies, pageNumber: pageNumber, providers: providers })
        }
        catch (error) {
            console.log("Error: " + error);
            res.render("movies")
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

module.exports = ViewController;