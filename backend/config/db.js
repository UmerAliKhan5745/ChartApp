const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URL || "mongodb://localhost:27017/chatAppumer"
    );

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
  }
};

module.exports = connectDB;
