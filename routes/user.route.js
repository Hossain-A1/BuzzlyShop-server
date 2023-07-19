const express = require("express");
const { signupUser, loginUser } = require("../controllers/user.controller");

const router = express.Router()

//register user
router.post("/auth/register",signupUser)
router.post("/auth/login",loginUser)




module.exports = router