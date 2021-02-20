const User = require("../models/User");
const Users = require("../models/User");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getUserByName = async (req, res) => {
    try {
        const user = await Users.find(req.params.username);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const setUserRun = async (req, res) => {
    try {
        const user = await Users.findOneAndUpdate(req.params.username, {
            $addToSet: { runs: req.params.run },
        });
    } catch {}
};
module.exports = {
    getAllUsers,
    getUserByName,
};
