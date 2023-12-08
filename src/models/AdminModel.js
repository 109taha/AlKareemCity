const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hash_password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Broker = mongoose.model("Admin", AdminSchema);

module.exports = Broker;
