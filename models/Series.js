const { response } = require("express");
const apiConfig = require("../config/apiConfig");

class Series {
    getAllSeries() {
        let pageNumber = 1;

        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${pageNumber}`, apiConfig.options)
                .then(response => response.json())
                .then(response => {
                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                    console.error("Error: " + err)
                });
        })

    }
}

module.exports = Series;