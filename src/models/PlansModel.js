import mongoose from "mongoose";

const PlansSchema = new mongoose.Schema(
  {
    sqYard: {
      type: Number,
    },
    blockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
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
    extraPaymentAmount: {
      type: Number,
    },
    possessionAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", PlansSchema);

export default Plan;
