const mongoose = require("mongoose");

const CategoryFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const CategoryForm = mongoose.model("CategoryFile", CategoryFormSchema);

module.exports = CategoryForm;
