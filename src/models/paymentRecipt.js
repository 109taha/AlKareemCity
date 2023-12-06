import mongoose from "mongoose";

const PaymentHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    PlotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plot",
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);
const PaymentHistory = mongoose.model("paymentHistory", PaymentHistorySchema);

export default PaymentHistory;
