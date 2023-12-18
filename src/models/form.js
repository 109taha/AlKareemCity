const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "CategoryFile",
    },
    file: String,
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", FormSchema);

module.exports = Form;
