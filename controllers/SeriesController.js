const Series = require("../models/Series");

class SeriesController {
    async displayAllSeries(req, res) {
        try {
            let series = new Series();
            let pageNumber = 1;
            const allSeries = await series.getAllSeries();
            res.render("series", { series: allSeries.results, pageNumber: pageNumber });
        } catch (error) {
            console.error("Error: " + error)
            res.render("series", { error: "Fehler" })
        }
    }
}

module.exports = SeriesController;