import User from "../models/UsersModels.js";
import Amount from "../models/AmountModel.js";
import PaymentHistory from "../models/AmountRecipt.js";

const allAmount = async (req, res) => {
  try {
    const userId = req.params.userId;

    const amount = await Amount.findOne({ userId }).populate("userId");

    if ((amount.userId.paymentOnThatMonth = true)) {
      amount.monthlyAmount = 0;
    }

    res.status(200).send({ success: true, data: amount });
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
    //user
    const user = await User.findById(userId);
    console.log(user.plotId.toString());
    user.paymentOnThatMonth = true;

    //amount
    const amountId = user.amount.toString();
    const amount = await Amount.findById(amountId);
    amount.totalPaidAmount = amount.monthlyAmount + amount.totalPaidAmount;
    amount.totalRemainingAmount =
      amount.totalRemainingAmount - amount.monthlyAmount;

    //recipt
    const plotId = user.plotId.toString();
    const recipt = new PaymentHistory({
      userId,
      plotId,
      date: new Date(),
    });
    await amount.save();
    await user.save();

    res.status(200).send({ success: true, data: user, amount, recipt });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

export { allAmount, paymentAmount };
