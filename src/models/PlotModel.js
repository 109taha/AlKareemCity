import mongoose from "mongoose";

const PlotSchema = mongoose.Schema(
  {
    plotNumber: {
      type: String,
    },
    BlockNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
    },
    type: {
      type: String,
      enum: ["commercial", "residential"],
    },
    sqYard: {
      type: Number,
    },
    feature: {
      type: String,
    },
    details: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Plot = new mongoose.model("Plot", PlotSchema);

export default Plot;
