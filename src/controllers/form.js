const { alternatives } = require("joi");
const Form = require("../models/form");
const FormCategory = require("../models/formCategpries");
const cloudinary = require("cloudinary");
const fs = require("fs");
const Gallery = require("../models/gallery");
const Documents = require("../models/docments");
const Plot = require("../models/PlotModel");

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
            folder: "alKarem",
          });
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
    console.log(fileArray);
    const { name, category } = req.body;
    console.log(category);
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
    console.log(newForm);

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
    const formCategory = await FormCategory.find();
    if (!formCategory.length > 0) {
      return res
        .status(404)
        .send({ success: false, message: "No form Data found" });
    }
    return res.status(200).send({ success: true, data: formCategory });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!" });
  }
};

const getForm = async (req, res) => {
  try {
    const categoryId = req.params.formId;
    const formCategory = await Form.find({ category: categoryId });
    if (!formCategory.length > 0) {
      return res
        .status(404)
        .send({ success: false, message: "No form Data found" });
    }
    return res.status(200).send({ success: true, data: formCategory });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!" });
  }
};

const getOneFormCategory = async (req, res) => {
  try {
    const formId = req.params.formId;
    const formCategory = await FormCategory.findById(formId);
    if (!formCategory) {
      return res
        .status(404)
        .send({ success: false, message: "No form Data found on that id" });
    }
    return res.status(200).send({ success: true, data: formCategory });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!" });
  }
};

const getOneForm = async (req, res) => {
  try {
    const formId = req.params.formId;
    const formCategory = await Form.findById(formId);
    if (!formCategory) {
      return res
        .status(404)
        .send({ success: false, message: "No form Data found on that id" });
    }
    return res.status(200).send({ success: true, data: formCategory });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!" });
  }
};

//gallery
const createGallery = async (req, res) => {
  const files = req.files;
  console.log(files);
  const attachArtwork = [];
  try {
    if (!files && !files.length > 0) {
      return res.status(400).send({
        success: false,
        message: "You have to upload atlest one image",
      });
    }
    for (const file of files) {
      const { path } = file;
      try {
        const uploader = await cloudinary.uploader.upload(path, {
          folder: "blogging",
        });
        attachArtwork.push({ url: uploader.secure_url });
        fs.unlinkSync(path);
      } catch (err) {
        if (attachArtwork.length > 0) {
          const imgs = attachArtwork.map((obj) => obj.public_id);
          cloudinary.api.delete_resources(imgs);
        }
        console.log(err);
      }
    }

    const title = req.body.title;
    if (!title) {
      return res
        .status(400)
        .send({ success: false, message: "You have to add title" });
    }
    const pics = [];
    for (let i = 0; i < attachArtwork.length; i++) {
      const element = attachArtwork[i].url;
      pics.push(element);
    }

    const newGallery = await Gallery({
      title,
      pics,
    });
    await newGallery.save();
    res.status(200).send({ success: true, data: newGallery });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
};

const getAllGallery = async (req, res) => {
  try {
    const allGallery = await Gallery.find();
    res.status(200).send({ success: true, data: allGallery });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
};

//PLOT DOC
const createDoc = async (req, res) => {
  const files = req.files;
  const attachArtwork = [];
  try {
    if (!files && !files.length > 0) {
      return res.status(400).send({
        success: false,
        message: "You have to upload atlest one image",
      });
    }
    for (const file of files) {
      const { path } = file;
      try {
        const uploader = await cloudinary.uploader.upload(path, {
          folder: "blogging",
        });
        attachArtwork.push({ url: uploader.secure_url });
        fs.unlinkSync(path);
      } catch (err) {
        if (attachArtwork.length > 0) {
          const imgs = attachArtwork.map((obj) => obj.public_id);
          cloudinary.api.delete_resources(imgs);
        }
        console.log(err);
      }
    }

    const { title, plotId } = req.body;
    if (!title || !plotId) {
      return res
        .status(400)
        .send({ success: false, message: "You have to add title and PlotId" });
    }
    const plot = await Plot.findById(plotId);
    if (!plot) {
      return res
        .status(400)
        .send({ success: false, message: "No plot found on that Id" });
    }
    const pics = [];
    for (let i = 0; i < attachArtwork.length; i++) {
      const element = attachArtwork[i].url;
      pics.push(element);
    }

    const newGallery = await Documents({
      title,
      plotId,
      pics,
    });
    await newGallery.save();
    res.status(200).send({ success: true, data: newGallery });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
};

const updateDoc = async (req, res) => {
  const files = req.files;

  const attachArtwork = [];

  try {
    if (files && files.length > 0) {
      for (const file of files) {
        const { path } = file;
        try {
          const uploader = await cloudinary.uploader.upload(path, {
            folder: "blogging",
          });
          attachArtwork.push({ url: uploader.secure_url });
          fs.unlinkSync(path);
        } catch (err) {
          if (attachArtwork.length > 0) {
            const imgs = attachArtwork.map((obj) => obj.public_id);
            cloudinary.api.delete_resources(imgs);
          }
          console.log(err);
        }
      }
    }

    const docId = req.params.docId;

    const { plotId, title } = req.body;
    if (plotId) {
      const plot = await Plot.findById(plotId);
      if (!plot) {
        return res
          .status(400)
          .send({ success: false, message: "No plot found on that Id" });
      }
    }

    const doc = await Documents.findById(docId);

    const pic = [];
    if (!attachArtwork.length <= 0) {
      for (let i = 0; i < attachArtwork.length; i++) {
        const element = attachArtwork[i].url;
        pic.push(element);
      }
    }

    doc.pics = !pic.length <= 0 ? pic : doc.pics;

    doc.plotId = plotId || doc.plotId;

    doc.title = title || doc.title;

    await doc.save();

    res.status(200).send({ success: true, data: doc });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
};

const getAllDoc = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }

    const total = await Documents.countDocuments();

    const totalPages = Math.ceil(total / limit);

    const allGallery = await Documents.find()
      .skip(skip)
      .limit(limit)
      .sort(sortBY);

    res.status(200).send({
      success: true,
      data: allGallery,
      page,
      totalPages,
      limit,
      total,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
};

const getAllUserDoc = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }

    const total = await Documents.countDocuments();

    const totalPages = Math.ceil(total / limit);

    const plotId = req.params.plotId;

    const allGallery = await Documents.find({ plotId })
      .skip(skip)
      .limit(limit)
      .sort(sortBY);

    res.status(200).send({
      success: true,
      data: allGallery,
      page,
      totalPages,
      limit,
      total,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
};

const getOneDoc = async (req, res) => {
  try {
    const docId = req.params.docId;
    const docCategory = await Documents.findById(docId).populate({
      path: "plotId",
      populate: "BlockNumber",
    });
    console.log(docCategory);
    if (!docCategory) {
      return res
        .status(404)
        .send({ success: false, message: "No form Data found on that id" });
    }
    return res.status(200).send({ success: true, data: docCategory });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!" });
  }
};

module.exports = {
  createCategory,
  createForm,
  getFormCategory,
  getForm,
  getOneFormCategory,
  getOneForm,
  createGallery,
  getAllGallery,
  createDoc,
  updateDoc,
  getAllDoc,
  getAllUserDoc,
  getOneDoc,
};
