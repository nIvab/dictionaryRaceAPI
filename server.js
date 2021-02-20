require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const conntecDB = require("./config/db");
const passport = require("passport");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const app = express();
connectDB();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost::3000", // react app
        credentials: true,
    })
);

app.use(
    session({
        secret: "euler",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser("euler"));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport);

// Routes

// allows /routes/userRoutes to proceed
app.use("/api/users", userRoutes);

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            throw err;
        } else if (!user) {
            res.send("No User Exists");
        } else {
            req.logIn(user, (err) => {
                res.send("Successfully Authenticated");
                console.log(req.user);
            });
        }
    })(req, res, next);
});

app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) {
            throw error;
        } else if (doc) {
            res.send("User Alreadt Exists");
        } else if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
            });

            await newUser.save;
            res.send("User Created");
        }
    });
});

app.get("/user", (req, res) => {
    res.send(req.user);
});

// Start server
app.listen(PORT, () => {
    console.log(`UP AND RUNNING ON PORT ${PORT}`);
});
