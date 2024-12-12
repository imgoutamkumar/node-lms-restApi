const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected : ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error connection to MongoDB : ${error}`);
    process.exit(1); //failure , 0 status code is success
  }
};

module.exports = { connectDB };
