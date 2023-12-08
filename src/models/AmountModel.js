const mongoose = require("mongoose");

const AmountSchema = new mongoose.Schema(
  {
    totalAmount: {
      type: Number,
    },
    bookingAmount: {
      type: Number,
    },
    monthlyAmount: {
      type: Number,
    },
    totalPaidAmount: {
      type: Number,
      default: 0,
    },
    totalRemainingAmount: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Amount = mongoose.model("Amount", AmountSchema);

module.exports = Amount;
