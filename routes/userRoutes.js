const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUserByName,
    setUserRun,
} = require("../controller/userControllers");

//@desc GET all the users from DB
//@route GET /api/users
//@access Public
router.get("/", getAllUsers);

//@desc GET a the users from DB by username
//@route GET /api/users/:username
//@access Public
router.get("/:id", getUserByName);

//@desc SET the run that a user has just finished
//@route SET /api/users/:username/:run
//@access Private
router.post("/:id/:run", setUserRun);

module.exports = router;
