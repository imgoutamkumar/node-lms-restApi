const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./src/db/connectDB");
const authRoute = require("./src/routes/auth.route");
const userRoute = require("./src/routes/user.route");
const mediaRoute = require("./src/routes/media.route");
const courseRoute = require("./src/routes/course.route");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser()); // allows us to parse incoming request with JSON payloads:req.body
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
    credentials: true, // Allow cookies
  })
);

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/media", mediaRoute);
app.use("/api/course", courseRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`server running on port : ${PORT}`);
});
