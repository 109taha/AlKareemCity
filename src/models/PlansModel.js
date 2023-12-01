import mongoose from "mongoose";

const PlansSchema = mongoose.Schema(
  {
    plotId: {
      type: mongoose.Schema.Types.ObjectId,
      reff: "Plot",
    },
    blockId: {
      type: mongoose.Schema.Types.ObjectId,
      reff: "Block",
    },
    bookingAmount: {
      type: Number,
    },
    instalmentAmount: {
      type: Number,
    },
    investmentMonth: {
      type: Number,
    },
    extraPaymentTerm: {
      type: Number,
      enum: [6, 12, 18, 36],
    },
    possessionAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Plan = new mongoose.model("Plan", PlansSchema);

export default Plan;
