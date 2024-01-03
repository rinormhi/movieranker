const { response } = require("express");
const apiConfig = require("../config/apiConfig");

class Person {

    

    getPersonInformation(personId) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/person/${personId}?language=de-DE`, apiConfig.options)
                .then(response => response.json())
                .then(response => {
                    resolve(response)
                })
                .catch(err => {
                    reject.error("getPersonInformation Error: " + err)
                });
        })
    }

    getPersonSocials(personId) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/person/${personId}/external_ids`, apiConfig.options)
                .then(response => response.json())
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    getPersonMovies(personId) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/person/${personId}/movie_credits?language=de-DE`, apiConfig.options)
                .then(response => response.json())
                .then(response => {
                    resolve(response.cast)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}


module.exports = Person; 