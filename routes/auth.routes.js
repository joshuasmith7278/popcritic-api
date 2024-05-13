const express = require('express');
const router = express.Router();

module.exports = (app) => {

    const authCntr = require('../controllers/auth.controller.js')

    app.post('/auth', authCntr.postAuth)

    app.use('/', router)

}