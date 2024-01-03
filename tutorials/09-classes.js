class User {
    constructor(fname, lname, uname, pwd) {
        this.fname = fname;
        this.lname = lname;
        this.uname = uname;
        this.pwd = pwd;
    }

    movies = [];
    watchlist = [];

    changePassword(oldPwd, newPwd) {
        if (oldPwd == this.pwd) {
            this.pwd = newPwd;
            console.log("Passwort wurde geändert");
        } else {
            console.log("Passwort stimmt nicht");
        }
    }

    getFname() {
        return this.fname;
    }

    setFname(fname) {
        this.fname = fname;
    }

    addToFavoriteMovies(movie) {
        this.movies.push(movie);
    }

    removeFromFavoriteMovies(movie) {
        if (this.movies.includes(movie)) {
            let i = this.movies.indexOf(movie);
            this.movies.splice(i, 1);
            console.log("Movie removed");
        } else {
            console.log("Cant find the movie in favorite movies");
        }
    }

    removeFromWatchlist(movie) {
        if (this.watchlist.includes(movie)) {
            let i = this.watchlist.indexOf(movie);
            this.watchlist.splice(i, 1);
            console.log("Movie removed");
        } else {
            console.log("Cant find the movie in the watchlist");
        }
    }

    addToWatchlist(movie) {
        if (this.watchlist.includes(movie)) {
            let i = this.watchlist.indexOf(movie);
            this.watchlist.splice(i, 1);
            console.log("Movie removed");
        } else {
            console.log("Cant find the movie movie in the watchlist");
        }
    }
}

module.exports = User;