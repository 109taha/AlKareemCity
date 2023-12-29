const router = require("express").Router();
const sendMail = require("../controllers/mailController");
const { mailJoi } = require("../utils/Schemas");

router.post("/sendmail", mailJoi, sendMail);

module.exports = router;
