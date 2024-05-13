const express = require('express');
const router = express.Router();

module.exports = (app) => {

    const revCntr = require('../controllers/likes.controller')

    app.post('/likes', revCntr.addLike)

    app.get('/likes/user/:uid', revCntr.getLikesUserID)

    app.get('/likes/movie/:uid/:mid', revCntr.getLikesUserIDandMovieID)

    app.get('/likes/review/:rid', revCntr.getLikeReviewID)

    app.use('/', router)

}