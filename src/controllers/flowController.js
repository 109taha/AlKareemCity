// const User = require("../models/UsersModels.js");
// const Amount = require("../models/AmountModel.js");
// const PaymentHistory = require("../models/AmountRecipt.js");
// const Panelty = require("../models/paneltyModel.js");
// const sendNotification = require("../helper/notiffication.js");

// const allAmount = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.findById(userId)
//       .populate({
//         path: "amount",
//         select:
//           "totalAmount bookingAmount monthlyAmount totalPaidAmount totalRemainingAmount createdAt",
//       })
//       .populate({ path: "panelty", select: "amount reason date" });

//     const currentDate = new Date();
//     const currentMonth = currentDate.toLocaleString("default", {
//       month: "long",
//     });

//     const totalAmount = user.amount.totalAmount;
//     const totalPaidAmount = user.amount.totalPaidAmount;
//     const bookingAmount = user.amount.bookingAmount;
//     const totalRemainingAmount = user.amount.totalRemainingAmount;

//     let monthlyAmount = user.amount.monthlyAmount;

//     // Check if paymentOnThatMonth is true, set monthlyAmount to 0
//     if (user.paymentOnThatMonth) {
//       monthlyAmount = 0;
//     } else if (user.panelty) {
//       // Check if there is a penalty for the current month
//       const lastPenaltyDate = new Date(user.panelty.date);
//       const lastPenaltyMonth = lastPenaltyDate.toLocaleString("default", {
//         month: "long",
//       });

//       if (lastPenaltyMonth === currentMonth) {
//         monthlyAmount += user.panelty.amount;
//       }
//     }

//     return res.status(200).send({
//       success: true,
//       data: {
//         totalAmount,
//         monthlyAmount,
//         bookingAmount,
//         totalPaidAmount,
//         totalRemainingAmount,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .send({ success: false, message: "Internal server error!", error });
//   }
// };

// //   let totalMoney = [];
// //   for (let index = 0; index < user.panelty.length; index++) {
// //     const element = user.panelty[index];
// //     if (!element.paid == true) totalMoney.push(element.amount);
// //   }
// //   const totalAmountOfPayThatMonth = totalMoney.reduce(
// //     (accumulator, currentValue) => accumulator + currentValue,
// //     user.amount.monthlyAmount
// //   );
// //   const totalAmount = user.amount.totalAmount;
// //   const bookingAmount = user.amount.bookingAmount;
// //   let monthlyAmount = user.amount.monthlyAmount;
// //   const totalPaidAmount = user.amount.totalPaidAmount;
// //   const totalRemainingAmount = user.amount.totalRemainingAmount;
// //   if (user.paymentOnThatMonth == false) {
// //     monthlyAmount = 0;
// //     console.log(monthlyAmount);
// //   }
// //   return res.status(200).send({
// //     success: true,
// //     data: {
// //       totalAmountOfPayThatMonth,
// //       totalAmount,
// //       bookingAmount,
// //       monthlyAmount,
// //       totalPaidAmount,
// //       totalRemainingAmount,
// //     },
// //   });

// //-------------------------------------------------------------------
// // const userId = req.params.userId;
// // const amount = await Amount.findOne({ userId }).populate({
// //   path: "userId",
// //   select: "name panelty",
// //   populate: { path: "panelty", select: "reason amount " },
// // });
// // const findPlaneltyId = amount.userId.panelty;
// // let paneltyId = [];
// // for (let index = 0; index < findPlaneltyId.length; index++) {
// //   const element = findPlaneltyId[index];
// //   const panelty = await Panelty.findById(element);
// //   if (panelty.paid == false) {
// //     paneltyId.push(panelty);
// //   }
// // }
// // const paneltyData = paneltyId.map((item) => ({
// //   amountPanelty: item.amount,
// //   reasonPanelty: item.reason,
// // }));
// // console.log(amount.monthlyAmount);
// // console.log(paneltyData);
// // for (let i = 0; i < paneltyData.length; i++) {
// //   const element = paneltyData[i];
// //   if (paneltyData.length < 0) {
// //     amount.monthlyAmount + element.amountPanelty;
// //   }
// // }
// // if (amount.userId.paymentOnThatMonth == false) {
// //   amount.monthlyAmount = 0;
// // }
// // res.status(200).send({ success: true, data: amount });

// const paymentAmount = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     //user
//     const user = await User.findById(userId);
//     console.log(user.plotId.toString());
//     user.paymentOnThatMonth = true;

//     //amount
//     const amountId = user.amount.toString();
//     const amount = await Amount.findById(amountId);
//     amount.totalPaidAmount = amount.monthlyAmount + amount.totalPaidAmount;
//     amount.totalRemainingAmount =
//       amount.totalRemainingAmount - amount.monthlyAmount;

//     //recipt
//     const plotId = user.plotId.toString();
//     const recipt = new PaymentHistory({
//       userId,
//       plotId,
//       date: new Date(),
//     });
//     await amount.save();
//     await user.save();

//     res.status(200).send({ success: true, data: user, amount, recipt });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .send({ success: false, message: "Internal server error!", error });
//   }
// };

// module.exports = { allAmount, paymentAmount };
