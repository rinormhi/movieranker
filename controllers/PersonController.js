const Person = require("../models/Person");

class PersonController {

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

}

module.exports = PersonController;