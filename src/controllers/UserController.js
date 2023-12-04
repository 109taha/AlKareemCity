import User from "../models/UsersModels.js";
import Admin from "../models/AdminModel.js";
import cloudinary from "../helper/cloudinary.js";
import fs from "fs";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

const registeredUser = async (req, res) => {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, message: "User Already Registerd" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const newUser = await User({
      name: user.name,
      email: user.email,
      hash_password: user.password,
    });
    await newUser.save();

    const token = JWT.sign({ userId: newUser._id }, process.env.JWT_SEC_USER);

    res.status(200).send({
      success: true,
      message: "User Registered Sucessfully",
      Token: token,
      Data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error!" });
    throw error;
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).send({
        success: false,
        message: "You have to provide the password and email",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "No user found on that email" });
    }
    const validPassword = await bcrypt.compare(password, user.hash_password);
    if (!validPassword) {
      return res.status(400).send({
        success: false,
        message: "Maybe your Email or Password is not correct!",
      });
    }

    const token = JWT.sign({ userId: user._id }, process.env.JWT_SEC_USER);

    return res.status(200).send({
      success: true,
      message: "User login successfully",
      Token: token,
      Data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, password } = req.body;
    const user = await User.findById(userId);

    if (password) {
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      user.hash_password = hashedPassword || user.hash_password;
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    const token = JWT.sign({ userId: user._id }, process.env.JWT_SEC_USER);

    return res.status(200).send({
      success: true,
      message: "User Update successfully",
      Token: token,
      Data: user,
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
    const { plotId, planId, planStartedDate, planEndedDate } = req.body;
    console.log("planStartedDate===>", planStartedDate);
    console.log("planEndedDate===>", planEndedDate);
    const user = await User.findById(userId);

    user.plotId = plotId || user.plotId;
    user.planId = planId || user.planId;
    user.planStartedDate = planStartedDate || user.planStartedDate;
    user.planEndedDate = planEndedDate || user.planEndedDate;

    await user.save();
    const token = JWT.sign({ userId: user._id }, process.env.JWT_SEC_USER);

    return res.status(200).send({
      success: true,
      message: "User Update successfully",
      Token: token,
      Data: user,
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
      Data: users,
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
    const users = await User.findById(userId);
    if (!users) {
      return res
        .status(400)
        .send({ success: false, message: "No users Found" });
    }

    res.status(200).send({
      success: true,
      message: "Following are the Users",
      Data: users,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
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
      first_name: admin.first_name,
      last_name: admin.last_name,
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
      Data: newAdmin,
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

    return res.status(200).send({
      success: true,
      message: "Admin login successfully",
      Token: token,
      Data: admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const AdminId = req.user;
    const { first_name, last_name, email, password, phone } = req.body;
    const admin = await Admin.findById(AdminId);
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(admin.password, salt);
      admin.password = hashedPassword;
      admin.hash_password = hashedPassword || admin.hash_password;
    }

    admin.first_name = first_name || admin.first_name;
    admin.last_name = last_name || admin.last_name;
    admin.email = email || admin.email;
    admin.phone = phone || admin.phone;

    const token = JWT.sign({ adminId: admin._id }, process.env.JWT_SEC_Admin);

    return res.status(200).send({
      success: true,
      message: "Admin Update successfully",
      Token: token,
      Data: admin,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const profilePicAdmin = async (req, res) => {
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
    const user = await Admin.findById(users);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    user.profile_pic =
      attachArtwork.length > 0 ? attachArtwork[0].url : user.profile_pic;

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
      Data: Admins,
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
      Data: Admins,
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

export {
  registeredUser,
  loginUser,
  updateUser,
  addPlan,
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
};
