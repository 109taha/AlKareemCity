const mongoose = require("mongoose");

const PaneltySchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    reason: {
      type: String,
      require: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Panelty = mongoose.model("Panelty", PaneltySchema);

module.exports = Panelty;
