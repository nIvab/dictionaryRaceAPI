require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
connectDB();

const PORT = process.env.PORT || 4000;
const SECRET_PASSPORT = process.env.SECRET_PASSPORT;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000", // react app
        credentials: true,
    })
);

app.use(
    session({
        secret: SECRET_PASSPORT,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser(SECRET_PASSPORT));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport);

// Routes
app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`UP AND RUNNING ON PORT ${PORT}`);
});
