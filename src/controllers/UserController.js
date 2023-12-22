const User = require("../models/UsersModels.js");
const Admin = require("../models/AdminModel.js");
const cloudinary = require("../helper/cloudinary.js");
const fs = require("fs");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authJoi } = require("../utils/Schemas.js");
const Plan = require("../models/PlansModel.js");

const registeredUser = async (req, res) => {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ uniqueId: user.uniqueId });
    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, message: "User Already Registerd" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.hash_password, salt);
    user.hash_password = hashedPassword;
    const newUser = await User(user);
    await newUser.save();
    const token = JWT.sign({ userId: newUser._id }, process.env.JWT_SEC_USER);

    res.status(200).send({
      success: true,
      message: "User Registered Sucessfully",
      Token: token,
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error!" });
    throw error;
  }
};

const otpVerify = async (req, res) => {
  try {
    const otpCode = req.body.otp;
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (otpCode != user.OTP) {
      return res.status(400).send({ success: false, message: "Wrong Code" });
    }

    user.isVerify = true;
    await user.save();
    const token = JWT.sign({ userId: user._id }, process.env.JWT_SEC_USER);

    res.status(200).send({
      success: true,
      message: "Your Acount is Verifyed!",
      Token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { uniqueId, password } = req.body;
    if (!uniqueId && !password) {
      return res.status(400).send({
        success: false,
        message: "You have to provide the password and email",
      });
    }
    const user = await User.findOne({ uniqueId }).populate("planId");
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "No user found on that email" });
    }
    console.log(user);
    const validPassword = await bcrypt.compare(password, user.hash_password);
    if (!validPassword) {
      return res.status(400).send({
        success: false,
        message: "Maybe your Email or Password is not correct!",
      });
    }
    if (user.isVerify == false) {
      const otpToken =
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      user.OTP = otpToken;
      await user.save();
    }

    const token = JWT.sign({ userId: user._id }, process.env.JWT_SEC_USER);

    res.status(200).send({
      success: true,
      message: "User login successfully",
      Token: token,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const {
      name,
      CNIC,
      fatherName,
      address,
      nationality,
      country,
      area,
      DOB,
      email,
      uniqueId,
      deviceToken,
      password,
    } = req.body;
    const user = await User.findById(userId);

    if (password) {
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      user.hash_password = hashedPassword || user.hash_password;
    }

    user.name = name || user.name;
    user.CNIC = CNIC || user.CNIC;
    user.fatherName = fatherName || user.fatherName;
    user.address = address || user.address;
    user.nationality = nationality || user.nationality;
    user.country = country || user.country;
    user.area = area || user.area;
    user.DOB = DOB || user.DOB;
    user.uniqueId = uniqueId || user.uniqueId;
    user.email = email || user.email;
    user.deviceToken = deviceToken || user.deviceToken;
    const allPlanId = user.planId;

    await user.save();
    const token = JWT.sign({ userId: user._id }, process.env.JWT_SEC_USER);

    res.status(200).send({
      success: true,
      message: "User Update successfully",
      Token: token,
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const addPlan = async (req, res) => {
  try {
    const userId = req.params.userId;
    const planId = req.body.planId;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "No user found on that Id" });
    }

    for (let i = 0; i < planId.length; i++) {
      const element = planId[i];
      const plan = await Plan.findById(element);

      if (!plan) {
        return res
          .status(404)
          .send({ success: false, message: "No plan found on that Id" });
      }
      user.planId.push(element);
    }

    await user.save();

    const token = JWT.sign({ userId: user._id }, process.env.JWT_SEC_USER);

    res.status(200).send({
      success: true,
      message: "User Update successfully",
      Token: token,
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const removePlan = async (req, res) => {
  try {
    const userId = req.params.userId;
    const planId = req.body.planId;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "No user found on that Id" });
    }

    for (let i = 0; i < planId.length; i++) {
      const element = planId[i];
      const plan = await Plan.findById(element);

      if (!plan) {
        return res
          .status(404)
          .send({ success: false, message: "No plan found on that Id" });
      }

      const planIndex = user.planId.indexOf(element);
      if (planIndex !== -1) {
        user.planId.splice(planIndex, 1);
      }
    }

    await user.save();

    const token = JWT.sign({ userId: user._id }, process.env.JWT_SEC_USER);

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      Token: token,
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const allUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const total = await User.countDocuments();

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }

    const users = await User.find().skip(skip).limit(limit).sort(sortBY);
    if (users.lenght <= 0) {
      return res
        .status(400)
        .send({ success: false, message: "No users Found" });
    }

    const totalPages = Math.ceil(total / limit);

    res.status(200).send({
      success: true,
      message: "Following are the all Users",
      data: users,
      page,
      totalPages,
      limit,
      total,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const oneUser = async (req, res) => {
  try {
    const userId = req.params.Id;
    const users = await User.findById(userId).populate("planId");
    if (!users) {
      return res
        .status(400)
        .send({ success: false, message: "No users Found" });
    }

    res.status(200).send({
      success: true,
      message: "Following are the Users",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const profilePic = async (req, res) => {
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
    const users = req.user;
    const user = await User.findById(users);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    user.profile_pic = attachArtwork[0].url || user.profile_pic;

    await user.save();

    res.status(200).send({
      success: true,
      message: "Profile pic added successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.Id;
    const user = await User.findByIdAndDelete(userId);

    res
      .status(200)
      .send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const registeredAdmin = async (req, res) => {
  try {
    const admin = req.body;
    const existingAdmin = await Admin.findOne({ email: admin.email });
    if (existingAdmin) {
      return res
        .status(400)
        .send({ success: false, message: "Admin Already Registerd" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(admin.password, salt);
    admin.password = hashedPassword;

    const newAdmin = await Admin({
      name: admin.name,
      email: admin.email,
      hash_password: admin.password,
    });

    await newAdmin.save();

    const token = JWT.sign(
      { AdminId: newAdmin._id },
      process.env.JWT_SEC_Admin
    );

    res.status(200).send({
      success: true,
      message: "Admin Registered Sucessfully",
      Token: token,
      data: newAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error!" });
    throw error;
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).send({
        success: false,
        message: "You have to provide the password and email",
      });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .send({ success: false, message: "No user found on that email" });
    }

    const validPassword = await bcrypt.compare(password, admin.hash_password);
    if (!validPassword) {
      return res.status(400).send({
        success: false,
        message: "Maybe your Email or Password is not correct!",
      });
    }

    const token = JWT.sign({ adminId: admin._id }, process.env.JWT_SEC_Admin);

    res.status(200).send({
      success: true,
      message: "Admin login successfully",
      Token: token,
      data: admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const AdminId = req.user;
    const { name, email, password } = req.body;
    const admin = await Admin.findById(AdminId);
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(admin.password, salt);
      admin.password = hashedPassword;
      admin.hash_password = hashedPassword || admin.hash_password;
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;

    const token = JWT.sign({ adminId: admin._id }, process.env.JWT_SEC_Admin);

    res.status(200).send({
      success: true,
      message: "Admin Update successfully",
      Token: token,
      data: admin,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const allAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const total = await Admin.countDocuments();

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }

    const Admins = await Admin.find().skip(skip).limit(limit).sort(sortBY);
    if (Admins.lenght <= 0) {
      return res
        .status(400)
        .send({ success: false, message: "No Admins Found" });
    }

    const totalPages = Math.ceil(total / limit);

    res.status(200).send({
      success: true,
      message: "Following are the all Admins",
      data: Admins,
      page,
      totalPages,
      limit,
      total,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const oneAdmin = async (req, res) => {
  try {
    const AdminId = req.params.Id;
    const Admins = await Admin.findById(AdminId);
    if (!Admins) {
      return res
        .status(400)
        .send({ success: false, message: "No Admins Found" });
    }

    res.status(200).send({
      success: true,
      message: "Following are the Admins",
      data: Admins,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const AdminId = req.params.Id;
    const admin = await Admin.findByIdAndDelete(AdminId);

    res
      .status(200)
      .send({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  registeredUser,
  otpVerify,
  loginUser,
  updateUser,
  addPlan,
  removePlan,
  allUser,
  deleteUser,
  oneUser,
  registeredAdmin,
  loginAdmin,
  updateAdmin,
  profilePic,
  allAdmin,
  deleteAdmin,
  oneAdmin,
};
