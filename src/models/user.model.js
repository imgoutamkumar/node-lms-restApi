const mongoose = require("mongoose");

const Role = {
  USER: "user",
  ADMIN: "admin",
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    role: {
      type: String, // Data type is String
      enum: Object.values(Role),
      default: Role.USER,
    },
    lastLogin: {
      type: Date,
      require: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationCode: String,
    verificationCodeExpiresAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
