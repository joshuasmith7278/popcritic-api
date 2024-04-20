const express = require('express');
const router = express.Router();

module.exports = (app) =>{
    const movieContlr = require('../controllers/movies.controller');

    router.get('/movies', movieContlr.getAllMovies);

    router.get('/movies/:name', movieContlr.getMovieName)

    router.get('/getMovie/:id', movieContlr.getMovieID)

    router.post('/movies', movieContlr.insertMovie);
    router.delete('/movies/:id', movieContlr.deleteMovie);

    app.use('/', router);
}