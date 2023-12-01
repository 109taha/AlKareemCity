import mongoose from "mongoose";

const PlotSchema = mongoose.Schema({
  plotNumber: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    enum: ["commercial", "residential"],
    require: true,
  },
  sqYard: {
    type: String,
    require: true,
  },
  details: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
});

const Plot = new mongoose.model("Plot", PlotSchema);

export default Plot;
