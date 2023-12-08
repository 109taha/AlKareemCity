import mongoose from "mongoose";

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
  },
  { timestamps: true }
);
const Panelty = mongoose.model("Panelty", PaneltySchema);

export default Panelty;
