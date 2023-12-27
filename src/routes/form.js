const {
  createCategory,
  createForm,
  getOneForm,
  getOneFormCategory,
  getForm,
  getFormCategory,
  createGallery,
  getAllGallery,
  createDoc,
  getAllDoc,
  getAllUserDoc,
  getOneDoc,
  updateDoc,
} = require("../controllers/form");

const upload = require("../helper/multer.js");
const express = require("express");
const router = express.Router();

router.post("/createCategory", createCategory);
router.post("/createForm", upload.array("file", 5), createForm);
router.get("/getForm/:formId", getForm);
router.get("/getFormCategory", getFormCategory);
router.get("/getOneForm/:formId", getOneForm);
router.get("/getOneFormCategory/:formId", getOneFormCategory);

//gallery
router.post("/createGallery", upload.array("file", 5), createGallery);
router.get("/getAllGallery", getAllGallery);

//doc
router.post("/createDoc", upload.array("file", 5), createDoc);
router.post("/updateDoc/:docId", upload.array("file", 5), updateDoc);
router.get("/getAllDoc", getAllDoc);
router.get("/getAllUserDoc/:plotId", getAllUserDoc);
router.get("/getOneDoc/:docId", getOneDoc);

module.exports = router;
