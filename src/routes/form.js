const {
  createCategory,
  createForm,
  getOneForm,
  getOneFormCategory,
  getForm,
  getFormCategory,
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

module.exports = router;
