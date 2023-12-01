import mongoose from "mongoose";

const BlockSchema = mongoose.Schema({
  blockName: {
    type: String,
    requier: true,
  },
  totalNumberOfPlot: {
    type: Number,
    require: true,
  },
  plotStartNumber: {
    type: Number,
  },
  plotEndNumber: {
    type: Number,
  },
});

const Block = new mongoose.model("Block", BlockSchema);

export default Block;
