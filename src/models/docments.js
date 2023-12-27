const mongoose = require("mongoose");

const DocumentsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    plotId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Plot",
    },
    pics: [
      {
        type: String,
        require: true,
      },
    ],
  },
  { timestamps: true }
);

const Documents = mongoose.model("Documents", DocumentsSchema);

module.exports = Documents;
