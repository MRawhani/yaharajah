const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const User = require('../controllers/UsersController')
router.post("/auth", User.auth);
router.post("/register", User.register);

module.exports = router;
