const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    pics: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = Gallery;
