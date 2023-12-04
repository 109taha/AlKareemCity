import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
    },
    hash_password: {
      type: String,
      require: true,
    },
    plotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plot",
    },
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
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User;
