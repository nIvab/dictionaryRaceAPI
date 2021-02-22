const User = require("../models/User");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

const getUserByName = async (req, res) => {
    try {
        console.log(req.params.id);
        let temp = req.params.id;
        const user = await User.findOne({ username: req.params.id });
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

const setUserRun = async (req, res) => {
    try {
        if (req.user) {
            const user = await User.findOneAndUpdate(req.params.id, {
                $addToSet: { runs: req.params.run },
            });
        } else {
            res.send("Please login to save your run");
        }
    } catch {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};
module.exports = {
    getAllUsers,
    getUserByName,
    setUserRun,
};
