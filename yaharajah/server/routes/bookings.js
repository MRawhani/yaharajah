const express = require("express");
const router = express.Router();
const BookingModel = require("../models/BookingModel");
const booking = require('../controllers/BookingController')
const UserCtrl = require('../controllers/UsersController')

router.post("", UserCtrl.authMiddleware, booking.createBooking);

module.exports = router;
