const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Block = mongoose.model("Block", BlockSchema);

module.exports = Block;
