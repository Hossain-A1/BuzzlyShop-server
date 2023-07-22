const express = require("express");
const { signupUser, loginUser, getAllUsers } = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth.user.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");

const router = express.Router()

//register user
router.post("/auth/register",signupUser)
// login user
router.post("/auth/login",loginUser)
// get all User
router.get("/",isAuthenticated,isAdmin,getAllUsers)




module.exports = router