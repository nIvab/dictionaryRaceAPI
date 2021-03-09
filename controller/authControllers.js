const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");

const login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            throw err;
        } else if (!user) {
            res.send("No User Exists");
            res.redirect("/login");
        } else {
            req.logIn(user, (err) => {
                res.send("Successfully Authenticated");
                console.log(req.user);
            });
        }
    })(req, res, next);
};

const register = (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) {
            throw error;
        } else if (doc) {
            res.send("User Already Exists");
        } else if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });

            await newUser.save();
            res.send("User Created");
            console.log(req.body);
        }
    });
};

module.exports = {
    login,
    register,
};
