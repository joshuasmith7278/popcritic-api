const express = require('express');
const router = express.Router();

module.exports = (app) => {

    const TMDBcontroller = require('../controllers/TMDB.controller')

    app.get('/recents', TMDBcontroller.getAllReviews)

    app.get('/images/:mid', TMDBcontroller.getImages)

    app.use('/', router)

}