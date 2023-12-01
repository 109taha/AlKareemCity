import mongoose from "mongoose";

const BlockSchema = mongoose.Schema({
  blockName: {
    type: String,
  },
  totalNumberOfPlot: {
    type: Number,
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
