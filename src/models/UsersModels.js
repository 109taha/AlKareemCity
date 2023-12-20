const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    CNIC: {
      type: String,
      require: true,
    },
    fatherName: {
      type: String,
    },
    address: {
      type: String,
      require: true,
    },
    nationality: {
      type: String,
    },
    country: {
      type: String,
      require: true,
    },
    area: {
      type: String,
    },
    DOB: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      lowerCase: true,
    },
    hash_password: {
      type: String,
      require: true,
    },
    planId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
      },
    ],
    deviceToken: {
      type: String,
    },
    profile_pic: {
      type: String,
    },
    OTP: {
      type: String,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
