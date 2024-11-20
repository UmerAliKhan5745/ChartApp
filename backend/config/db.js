const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  // Make sure this is your MongoDB Atlas URI
  const mongoURI =
    process.env.MONGO_URI ||
    "mongodb+srv://aumeralikhan:Y9xJniALOxLgTi7v@cluster0.nshcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));
};

module.exports = connectDB;
