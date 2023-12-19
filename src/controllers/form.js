const Form = require("../models/form");
const FormCategory = require("../models/formCategpries");
const cloudinary = require("cloudinary");
const fs = require("fs");

const createCategory = async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(404).send({
        success: false,
        message: "You have to add Name of the categroy",
      });
    }
    const newFormCategory = new FormCategory({
      name,
    });
    await newFormCategory.save();
    res.status(200).send({
      success: true,
      message: "successfully created new form category!",
      data: newFormCategory,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error !" });
  }
};

const createForm = async (req, res) => {
  try {
    const files = req.files;
    const fileArray = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const { path } = file;
        try {
          const uploader = await cloudinary.uploader.upload(path, {
            folder: "blogging",
          });
          console.log(uploader);
          fileArray.push({ url: uploader.secure_url });
          fs.unlinkSync(path);
        } catch (err) {
          if (fileArray.length > 0) {
            const imgs = fileArray.map((obj) => obj.public_id);
            cloudinary.api.delete_resources(imgs);
          }
          console.log(err);
        }
      }
    }
    const { name, category } = req.body;
    if (!name || !category) {
      return res.status(404).send({
        success: false,
        message: "You have to add Name and categroy",
      });
    }
    const newForm = new Form({
      name,
      category,
      file: fileArray[0].url,
    });
    await newForm.save();
    res.status(200).send({
      success: true,
      message: "successfully created new form form!",
      data: newForm,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error !" });
  }
};

const getFormCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!" });
  }
};

module.exports = { createCategory, createForm };