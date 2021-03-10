const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");

const login = (req, res, next) => {
    console.log("_______LOGIN CALLED________");
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.log(err);
            return next(err);
        } else if (!user) {
            console.log("___NO USER");
            res.send("No User Exists");
        }
        req.logIn(user, (err) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log("___SUCCESSFULLY AUTHENTICATED_____");
            res.send("Successfully Authenticated");
        });
    })(req, res, next);
};

const register = (req, res) => {
    console.log("______REGISTER CALLED______");
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
