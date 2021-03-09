require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully ");
    } catch (error) {
        console.log(error);
        console.log("MongoDB failed to connect");
        process.exit(1);
    }
};
module.exports = connectDB;
