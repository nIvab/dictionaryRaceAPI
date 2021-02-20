require("dotenv").config();

const userData = require("./data/users");
const connectDB = require("./config/db");
const User = require("./models/User");

connectDB();

const importData = async () => {
    try {
        await User.deleteMany({});
        await User.insertMany(userData);
        console.log("Data Import Success");
        process.exit();
    } catch (error) {
        console.error("Error with data import");
        process.exit(1);
    }
};

importData();
