import User from "../models/UsersModels.js";
import Block from "../models/BlocksModel.js";
import Plot from "../models/PlotModel.js";
import Plan from "../models/PlansModel.js";

const allAmount = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate("amount");
    const Data = user.amount;

    res.status(200).send({ success: true, data: Data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const paymentAmount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    console.log(user);

    user.paymentOnThatMonth = true;

    await user.save();

    return res.status(200).send({ success: true, data: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

export { allAmount, paymentAmount };
