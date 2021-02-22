const express = require("express");
const router = express.Router();
const { login, register } = require("../controller/authControllers");

//@desc SETS logged user to be logged in
//@route /api/auth/login
//@access Public
router.post("/login", login);

//@desc SETS new user to be created
//@route /api/auth/register
//@access
router.post("/register", register);

//@desc GETS user
//@route /api/auth/user
//@access PRIVATE
router.get("/user", (req, res) => {
    res.send(req.user);
});

module.exports = router;
