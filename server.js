const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./src/db/connectDB");
const authRoute = require("./src/routes/auth.route");
dotenv.config();
const app = express();
const allowedOrigins = ["http://localhost:5173", "http://localhost:4200"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // allows us to parse incoming request with JSON payloads:req.body
app.use("/api/auth", authRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`server running on port : ${PORT}`);
});
