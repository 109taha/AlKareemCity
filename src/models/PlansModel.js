const mongoose = require("mongoose");

const PlansSchema = new mongoose.Schema(
  {
    plotNumber: {
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
    },
    extraPaymentAmount: {
      type: Number,
    },
    possessionAmount: {
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
    assigned: {
      type: Boolean,
      requi: true,
      default: false,
    },
    payments: [
      {
        installmentNumber: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        dueDate: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "paid"],
          default: "pending",
        },
        paymentDate: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", PlansSchema);

module.exports = Plan;
