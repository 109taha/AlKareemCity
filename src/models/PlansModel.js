import mongoose from "mongoose";

const PlansSchema = mongoose.Schema(
  {
    plotId: {
      type: mongoose.Schema.Types.ObjectId,
      reff: "Plot",
      require: true,
    },
    block: {
      type: mongoose.Schema.Types.ObjectId,
      reff: "Block",
      require: true,
    },
    bookingAmount: {
      type: Number,
      require: true,
    },
    instalmentAmount: {
      type: Number,
      require: true,
    },
    investmentMonth: {
      type: Number,
      require: true,
    },
    extraPaymentTerm: {
      type: Numeber,
      require: true,
      enum: [6, 12, 18, 36],
    },
    possessionAmount: {
      type: Numebr,
      require: true,
    },
  },
  { timestamps: true }
);

const Plan = new mongoose.model("Plan", PlansSchema);

export default Plan;
