const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            (email, password, done) => {
                console.log("____PASSPORT USE RAN");
                User.findOne({ email: email }, (err, user) => {
                    console.log("RESULT OF FIND ONE", user);
                    if (err) {
                        throw err;
                    } else if (!user) {
                        console.log("____NO USER FOUND", user);
                        return done(null, false);
                    } else {
                        bcrypt.compare(
                            password,
                            user.password,
                            (err, result) => {
                                if (err) {
                                    throw err;
                                } else if (result == true) {
                                    console.log("____PASSWORD COMPARE", result);
                                    return done(null, user);
                                } else {
                                    console.log("____PASSWORDS DO NOT MATCH");
                                    return done(null, false);
                                }
                            }
                        );
                    }
                });
            }
        )
    );

    passport.serializeUser((user, cb) => {
        console.log("_____SERIALIZEUSER USER ", user);
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        USer.findOne({ _id: id }, (err, user) => {
            cb(err, user);
        });
    });
};
