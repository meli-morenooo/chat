const express = require("express");
const { registerUser, resgisterUser } = require("../Controllers/userController");

const router = express.Router();

router.post("/register", resgisterUser);

module.exports = router;