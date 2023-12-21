const {
  registeredUser,
  loginUser,
  updateUser,
  addPlan,
  profilePic,
  allUser,
  deleteUser,
  oneUser,
  registeredAdmin,
  loginAdmin,
  updateAdmin,
  allAdmin,
  deleteAdmin,
  oneAdmin,
  otpVerify,
} = require("../controllers/UserController.js");
const { verifyUser, verifyAdmin } = require("../middlewares/middlewares.js");
const { UserJoi, AdminJoi } = require("../utils/Schemas.js");
const upload = require("../helper/multer.js");
const express = require("express");
const router = express.Router();

//users
router.post("/register", UserJoi, registeredUser);
router.post("/login", loginUser);
router.post("/otp/:userId", otpVerify);
router.post("/addPlan/:userId", addPlan);
router.put("/update/:userId", updateUser);
router.post(
  "/profilePic",
  upload.array("attachArtwork", 1),
  verifyUser,
  profilePic
);
router.get("/all", allUser);
router.get("/one/:Id", oneUser);
router.delete("/delete/:Id", deleteUser);

//Admin
router.post("/registerAdmin", AdminJoi, registeredAdmin);
router.post("/loginAdmin", loginAdmin);
router.put("/updateAdmin", verifyAdmin, updateAdmin);
router.get("/allAdmin", allAdmin);
router.get("/oneAdmin/:Id", oneAdmin);
router.delete("/deleteAdmin/:Id", deleteAdmin);

module.exports = router;
