const { response } = require("express");
const apiConfig = require("../config/apiConfig");

const genreIdMap = {
    "action": 28,
    "adventure": 12,
    "animation": 16,
    "comedy": 35,
    "crime": 80,
    "documentary": 99,
    "drama": 18,
    "family": 10751,
    "fantasy": 14,
    "history": 36,
    "horror": 27,
    "music": 10402,
    "mystery": 9648,
    "romance": 10749,
    "science fiction": 878,
    "thriller": 53,
    "war": 10752,
    "western": 37,
    null: ""
};

class Movie {
    constructor(id, overview, popularity, poster_path, release_date, title, vote_average, vote_count) {
        this.id = id;
        this.overview = overview;
        this.popularity = popularity;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.title = title;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
    }

    getGenreId(genre) {
        return genreIdMap[genre] || null;
    }
    getProviderId(provider) {
        return providerIdMap[provider] || null;
    }

    getAllProviders() {
        return new Promise((resolve, reject) => {
            fetch('https://api.themoviedb.org/3/watch/providers/movie?language=de-DE&watch_region=DE', apiConfig.options)
                .then(response => response.json())
                .then(response => resolve(response.results))
                .catch(err => reject(err));
        })
    }

    async fetchMoviesWithOptions(page, genres, providers, sortby, monetization, minYear, maxYear) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=de-DE&page=${page}&primary_release_date.gte=${minYear}-01-01&primary_release_date.lte=${maxYear}-12-31&sort_by=${sortby}&watch_region=DE&with_watch_monetization_types=${monetization}&with_genres=${genres}&with_watch_providers=${providers}`, apiConfig.options);
            const data = await response.json();
            return data.results;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getMovies(pages, genres, providers, sortby, monetization, minYear, maxYear) {

        const p1 = pages[0];
        const p2 = pages[1];
        const p3 = pages[2];

        providers = providers.join("|")

        genres = genres.join("|")

        const [result1, result2, result3] = await Promise.all([this.fetchMoviesWithOptions(p1, genres, providers, sortby, monetization, minYear, maxYear), this.fetchMoviesWithOptions(p2, genres, providers, sortby, monetization, minYear, maxYear), this.fetchMoviesWithOptions(p3, genres, providers, sortby, monetization, minYear, maxYear)]);
        const combinedResults = result1.concat(result2).concat(result3);

        return combinedResults;
    }

    getUpcomingMovies() {
        return new Promise((resolve, reject) => {
            fetch('https://api.themoviedb.org/3/movie/upcoming?language=de-DE&page=1', apiConfig.options)
                .then(response => response.json())
                .then(data => {
                    resolve(data.results);
                })
                .catch(err => {
                    reject(err)
                    console.error("Error: " + err)
                });
        })
    }

    async getMoviesFromGenre(genre) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=de-DE&page=1&sort_by=popularity.desc&with_genres=${genre}`, apiConfig.options)
                .then(response => response.json())
                .then(data => {
                    resolve(data.results);
                })
                .catch(err => {
                    reject(err)
                    console.error("Error: " + err)
                });
        })
    }



    async getAllMovies(pages) {
        try {
            const p1 = pages[0];
            const p2 = pages[1];
            const p3 = pages[2];

            const [result1, result2, result3] = await Promise.all([this.fetchMovies(p1), this.fetchMovies(p2), this.fetchMovies(p3)]);

            const combinedResults = result1.concat(result2).concat(result3);
            return combinedResults;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }



    async fetchMovies(page) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=de-DE&page=${page}`, apiConfig.options);
            const data = await response.json();
            return data.results;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    getPopularMovies() {
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiConfig.apiKey}`)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject('Fehler beim Abrufen von Daten von der TMDb API:', error);
                });
        });
    }

    getNowPlayingMovies() {
        return new Promise((resolve, reject) => {
            fetch('https://api.themoviedb.org/3/movie/now_playing?language=de-DE&page=1', apiConfig.options)
                .then(response => response.json())
                .then(data => {
                    resolve(data.results)
                })
                .catch(error => {
                    reject('Fehler beim Abrufen von Daten von der TMDb API:', error);
                });
        })
    }
    getSearchResults(query) {
        let movies = [];

        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=de-DE&page=1`, apiConfig.options)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject('Fehler beim Abrufen von Daten von der TMDb API:', error);
                })
        })
    }

    getMovieInformation(movieId) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=de-DE`, apiConfig.options)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject("Fehler beim Abrufen von Daten von der TMDb API:", error);
                })
        })
    }
    getMovieDirector(movieId) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=de-DE`, apiConfig.options)
                .then(response => response.json())
                .then(data => {
                    let crew = data.crew;
                    let director;
                    for (let i = 0; i < crew.length; i++) {
                        if (crew[i].job == "Director") {
                            director = crew[i];
                            resolve(director);
                            break;
                        }
                    }
                })
                .catch(error => {
                    console.log("error");
                    reject("Fehler beim Abrufen von Daten von der TMDb API:", error);
                })
        })
    }

    getMovieArtists(movieId) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=de-DE`, apiConfig.options)
                .then(response => response.json())
                .then(data => {
                    resolve(data.cast);
                })
        })
    }

    getMovieCrew(movieId) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=de-DE`, apiConfig.options)
                .then(response => response.json())
                .then(data => {
                    resolve(data.crew);
                })
        })
    }

    getProviders(movieId) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, apiConfig.options)
                .then(response => response.json())
                .then(data => {
                    let results = data.results.DE
                    resolve(results)
                })
                .catch(err => {
                    reject(err);
                    console.error("Error: " + err)

                })
        })
    }

    getTrailer(movieId) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-EN`, apiConfig.options)
                .then(response => response.json())
                .then(data => {
                    if (data.results != "") {
                        let url = "https://www.youtube.com/embed/" + data.results[0].key;
                        resolve(url)
                    } else {
                        reject("No Trailer")
                    }
                })
                .catch(err => {
                    reject(err);
                    console.error("Error: " + err)
                })
        })
    }

    getReviews(movieId) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=de-DE&page=1`, apiConfig.options)
                .then(result => result.json())
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject("getReviews Error: " + err)
                })
        })
    }
}

module.exports = Movie;

// const providerIdMap = {
//     "nfx": 8,
//     "apv": 9,
//     "dnp": 337,
//     "atp": 350,
//     "wow": 30,
//     "crl": 283,
//     "skg": 29,
//     "amv": 10,
//     "prp": 531,
//     "gpm": 3,
//     "jyn": 304,
//     "ytb": 192,
//     "sks": 130,
//     "rkt": 35,
//     "rtl": 298,
//     "mxd": 20,
//     "vbr": 133,
//     "ytp": 188,
//     "alk": 33,
//     "art": 234,
//     "mgtv": 178,
//     "soon": 389,
//     "real": 14,
//     "ardm": 219,
//     "chil": 40,
//     "mub": 11,
//     "ntzk": 28,
//     "nflk": 175,
//     "guid": 100,
//     "micr": 68,
//     "pflx": 177,
//     "zdfh": 286,
//     "bbcaz": 285,
//     "mubiaz": 201,
//     "shudaz": 204,
//     "filmaz": 334,
//     "wedo": 392,
//     "blu": 341,
//     "kino": 349,
//     "rak": 344,
//     "jynp": 421,
//     "con": 428,
//     "cur": 190,
//     "docsv": 475,
//     "hoh": 479,
//     "filmt": 480,
//     "arth": 481,
//     "popc": 522,
//     "spflx": 521,
//     "lcine": 310,
//     "arthaz": 687,
//     "azac": 533,
//     "zdf": 537,
//     "plex": 538,
//     null: ""
// WOW Presents Plus 546
// filmfriend 542
// Magellan TV 551
// BroadwayHD 554
// Filmzie 559
// MovieSaints 562
// Dekkoo 444
// Dogwoof On Demand 536
// True Story 567
// DocAlliance Films 569
// Hoichoi 315
// Pluto TV 300
// Eventive 677
// Filmlegenden Amazon Channel 678
// Cinema of Hearts Amazon Channel 679
// Home of Horror Amazon Channel 686
// Bloody Movies Amazon Channel 680
// Film Total Amazon Channel 681
// Turk On Video Amazon Channel 693
// Cultpix 692
// FilmBox+ 701
// AVA VOBB 1722
// AVA HBZ 1723
// BluTV Amazon Channel 1707
// Comedy Central Plus Amazon Channel 1706
// GRJNGO Amazon Channel 1709
// MGM Amazon Channel 588
// MTV Plus Amazon Channel 1711
// Silverline Amazon Channel 1713
// Sony AXN Amazon Channel 1714
// RTL Passion Amazon Channel 1712
// Freevee 613
// Realeyz Amazon Channel 1757
// Yorck on Demand 1764
// Takflix 1771
// Love and Passion Amazon Channel 1788
// Sun Nxt 309
// Classix 445
// Netflix basic with Ads 1796
// Studiocanal Presents MOVIECULT Amazon Channel 1805
// Studiocanal Presents ALLSTARS Amazon Channel 1806
// Discovery+ Amazon Channel 584
// Paramount+ Amazon Channel 582
// Behind the Tree 1829
// filmingo 1756
// Paramount Plus Apple TV Channel  1853
// OUTtv Amazon Channel 607
// alleskino Amazon Channel 1891
// RTL Crime Amazon Channel 1892
// ARD Plus 1902
// Moviedome Plus Amazon Channel 706
// Aniverse Amazon Channel 707
// Superfresh Amazon Channel 708
// AD tv 1958
// Shahid VIP 1715
// Full Moon Amazon Channel 597
// ZDF Select Amazon Channel  1989
// };
