const express = require('express');
const router = express.Router();

module.exports = (app) => {

    const revCntr = require('../controllers/review.controller')

    app.get('/reviews', revCntr.getAllReviews)

    app.post('/reviews', revCntr.createReview)

    app.get('/homeRev', revCntr.getHomeReviews)

    app.use('/', router)

}