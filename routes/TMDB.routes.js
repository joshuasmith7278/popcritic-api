const express = require('express');
const router = express.Router();

module.exports = (app) => {

    const TMDBcontroller = require('../controllers/TMDB.controller')

    app.get('/recents', TMDBcontroller.getAllReviews)

    app.get('/movie/:mid', TMDBcontroller.getMovie)

    app.get('/search/:search', TMDBcontroller.searchMovie)


    app.use('/', router)

}