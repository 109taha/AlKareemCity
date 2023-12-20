const mongoose = require("mongoose");

const PlansSchema = new mongoose.Schema(
  {
    pLanId: {
      type: String,
    },
    totalAmount: {
      type: Number,
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
    planStartedDate: {
      type: Date,
    },
    planEndedDate: {
      type: Date,
    },
    totalPaidAmount: {
      type: Number,
      default: 0,
    },
    totalRemainingAmount: {
      type: Number,
    },
    plotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plot",
    },
    panelty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Panelty",
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", PlansSchema);

module.exports = Plan;
