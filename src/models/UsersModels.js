const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    uniqueId: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      lowerCase: true,
    },
    hash_password: {
      type: String,
      require: true,
    },
    plotId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plot",
      },
    ],
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
    planStartedDate: {
      type: Date,
    },
    planEndedDate: {
      type: Date,
    },
    paymentOnThatMonth: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amount",
    },

    panelty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Panelty",
    },
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
