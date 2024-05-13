const express = require('express');
const router = express.Router();


module.exports = app => {

  const userContr = require('../controllers/users.controller');

  //Create users
  router.post('/users', userContr.createUser);

  //Find All Users
  router.get('/users', userContr.getAllUsers);

  //Find one user
  router.get('/users/:id', userContr.findOneUser);


  router.get('/users/:email', userContr.findUserEmail);

  //Update one User
  router.put('/users/:id', userContr.updateUser);

  //Delete one User
  router.delete('/users/:id', userContr.deleteUser);

  app.use('/', router)



}




