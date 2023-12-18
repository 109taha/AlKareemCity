const { createCategory, createForm } = require("../controllers/form");

const upload = require("../helper/multer.js");
const express = require("express");
const router = express.Router();

router.post("/createCategory", createCategory);
router.post("/createForm", upload.array("file", 5), createForm);

module.exports = router;
