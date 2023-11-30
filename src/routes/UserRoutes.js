import {
  registeredUser,
  loginUser,
  updateUser,
  allUser,
  deleteUser,
  oneUser,
  registeredAdmin,
  loginAdmin,
  updateAdmin,
  profilePicAdmin,
  allAdmin,
  deleteAdmin,
  oneAdmin,
} from "../controllers/UserController.js";
import { verifyUser, verifyAdmin } from "../middlewares/middlewares.js";
import { UserJoi, AdminJoi } from "../utils/Schemas.js";
import upload from "../helper/multer.js";
import express from "express";
const router = express.Router();

//users
router.post("/register", UserJoi, registeredUser);
router.post("/login", loginUser);
router.put("/update", verifyUser, updateUser);
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

export default router;
