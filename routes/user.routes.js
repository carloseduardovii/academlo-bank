const express = require('express');

//middlewares

//controller
const {
  getAllusers,
  getIdHistory,
  userSingUp,
} = require('../controllers/user.controller');

const router = express.Router();

//routes
router.route('/singup').post(userSingUp);

// router.route('/login').post();

// router.route('/:id/history').get(getIdHistory);

module.exports = { userRouter: router };
