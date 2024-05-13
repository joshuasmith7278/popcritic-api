const express = require('express');
const router = express.Router();

module.exports = (app) => {

    const revCntr = require('../controllers/review.controller')

    app.get('/reviews', revCntr.getAllReviews)

    app.post('/reviews', revCntr.createReview)

    app.get('/homeRev', revCntr.getHomeReviews)

    app.get('/reviews/:rid', revCntr.getReviewByRID)

    app.get('/getRevFromMID/:mid', revCntr.getRevByMovieID)

    app.get('/getReviewsFromUID/:uid', revCntr.getReviewsByUID)

    app.use('/', router)

}