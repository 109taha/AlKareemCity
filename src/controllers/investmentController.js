const BlockModel = require("../models/BlocksModel.js");
const PlotModel = require("../models/PlotModel.js");
const PlanModel = require("../models/PlansModel.js");
const Panelty = require("../models/paneltyModel.js");
const User = require("../models/UsersModels.js");
const Plot = require("../models/PlotModel.js");
const Plan = require("../models/PlansModel.js");

// Block
const createingBlock = async (req, res) => {
  try {
    const blockData = req.body;
    const existingBlock = await BlockModel.findOne({
      blockName: blockData.blockName,
    });

    if (existingBlock)
      return res.status(400).send({
        success: false,
        message: `You Already Created Block Named: ${blockData.blockName}`,
        existingBlock: existingBlock,
      });

    if (blockData.plotStartNumber > blockData.plotEndNumber) {
      return res.status(400).send({
        success: false,
        message: "Plot Ending number must be greater then plor starting number",
      });
    }

    const newBlock = new BlockModel({
      blockName: blockData.blockName,
      totalNumberOfPlot: blockData.plotEndNumber - blockData.plotStartNumber,
      plotStartNumber: blockData.plotStartNumber,
      plotEndNumber: blockData.plotEndNumber,
    });

    await newBlock.save();

    res.status(200).send({ success: true, data: newBlock });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const updateBlock = async (req, res) => {
  try {
    const { blockName, totalNumberOfPlot, plotStartNumber, plotEndNumber } =
      req.body;
    const blockId = req.params.blockId;
    const block = await BlockModel.findById(blockId);
    if (!block) {
      return res
        .status(400)
        .send({ success: false, message: "No block found on that Id" });
    }

    block.blockName = blockName || block.blockName;
    block.totalNumberOfPlot = totalNumberOfPlot || block.totalNumberOfPlot;
    block.plotStartNumber = plotStartNumber || block.plotStartNumber;
    block.plotEndNumber = plotEndNumber || block.plotEndNumber;

    await block.save();

    res.status(200).send({ success: true, data: block });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const getAllBlock = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }

    const total = await BlockModel.countDocuments();

    const totalPages = Math.ceil(total / limit);

    const allData = await BlockModel.find()
      .skip(skip)
      .limit(limit)
      .sort(sortBY);

    if (!allData > 0) {
      return res
        .status(400)
        .send({ success: false, message: "No blocks found!" });
    }

    res
      .status(200)
      .send({ success: true, data: allData, page, totalPages, limit, total });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const getOneBlock = async (req, res) => {
  try {
    const blockId = req.params.blockId;
    const block = await BlockModel.findById(blockId);
    if (!block) {
      return res
        .status(400)
        .send({ success: false, message: "No block found on that Id" });
    }
    res.status(200).send({ success: true, data: block });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const deleteBlock = async (req, res) => {
  try {
    const blockId = req.params.blockId;
    const block = await BlockModel.findByIdAndDelete(blockId);
    if (!block) {
      return res
        .status(400)
        .send({ success: false, message: "No block found on that Id" });
    }
    res
      .status(200)
      .send({ success: true, message: "Block deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

// Plot
const createingPlot = async (req, res) => {
  try {
    const plotData = req.body;

    const existingPlot = await PlotModel.findOne({
      plotNumber: plotData.plotNumber,
    });

    if (existingPlot)
      return res.status(400).send({
        success: false,
        message: `You Already Added that plot: ${plotData.plotNumber}`,
        existingPlot: existingPlot,
      });

    const newPlot = new PlotModel({
      plotNumber: plotData.plotNumber,
      BlockNumber: plotData.BlockNumber,
      type: plotData.type,
      sqYard: plotData.sqYard,
      feature: plotData.feature,
      details: plotData.details,
      price: plotData.price,
    });

    await newPlot.save();

    res.status(200).send({ success: true, data: newPlot });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const multiplePlot = async (req, res) => {
  try {
    const plotData = req.body;

    const newPlot = await PlotModel.create(plotData);

    res.status(200).send({ success: true, data: newPlot });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const updatePlot = async (req, res) => {
  try {
    const { plotNumber, BlockNumber, type, sqYard, details, price } = req.body;
    const plotId = req.params.plotId;
    const plot = await PlotModel.findById(plotId);
    if (!plot) {
      return res
        .status(400)
        .send({ success: true, message: "No plot found on that Id" });
    }
    plot.plotNumber = plotNumber || plot.plotNumber;
    plot.BlockNumber = BlockNumber || plot.BlockNumber;
    plot.type = type || plot.type;
    plot.sqYard = sqYard || plot.sqYard;
    plot.details = details || plot.details;
    plot.price = price || plot.price;
    await plot.save();
    res.status(200).send({ success: true, data: plot });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const getAllPlot = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }

    const total = await PlotModel.countDocuments();

    const totalPages = Math.ceil(total / limit);

    const allData = await PlotModel.find()
      .populate({
        path: "BlockNumber",
        select: "blockName",
      })
      .skip(skip)
      .limit(limit)
      .sort(sortBY);

    if (!allData > 0) {
      return res
        .status(400)
        .send({ success: false, message: "No Plot found!" });
    }

    res
      .status(200)
      .send({ success: true, data: allData, page, totalPages, limit, total });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const getOnePlot = async (req, res) => {
  try {
    const plotId = req.params.plotId;
    const plot = await PlotModel.findById(plotId).populate({
      path: "BlockNumber",
      select: "blockName totalNumberOfPlot",
    });
    if (!plot) {
      return res
        .status(400)
        .send({ success: false, message: "No plot found on that Id" });
    }
    res.status(200).send({ success: true, data: plot });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const getUserPlot = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId)
      .select("plotId")
      .populate("plotId");
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "No user found on that Id" });
    }

    res.status(200).send({ success: true, data: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const deletePlot = async (req, res) => {
  try {
    const plotId = req.params.plotId;
    const plot = await PlotModel.findByIdAndDelete(plotId);
    if (!plot)
      return res
        .status(400)
        .send({ success: false, message: "No plot found on that Id" });
    res
      .status(200)
      .send({ success: true, message: "Plot Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const searchPlotByUser = async (req, res) => {
  try {
    const searchfield = req.params.ownerName;

    let sortBY = { createdAt: -1 };

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const total = await User.countDocuments({
      name: { $regex: searchfield, $options: "i" },
    });

    const plant = await User.find({
      name: { $regex: searchfield, $options: "i" },
    })
      .select("plotId name ")
      .sort(sortBY)
      .skip(skip)
      .limit(limit)
      .populate("plotId");

    const totalPages = Math.ceil(total / limit);

    res
      .status(200)
      .send({ success: true, data: plant, limit, total, totalPages });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const allPlotsByBlock = async (req, res) => {
  try {
    const blockId = req.params.blockId;

    let sortBY = { createdAt: -1 };

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const total = await PlotModel.countDocuments({
      BlockNumber: blockId,
    });

    const plot = await PlotModel.find({
      BlockNumber: blockId,
    })
      .populate({ path: "BlockNumber", select: "blockName" })
      .sort(sortBY)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit);

    if (!plot.length > 0) {
      return res.status(404).send({ success: false, message: "No plot found" });
    }
    res
      .status(200)
      .send({ success: true, data: plot, limit, total, totalPages });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
};

const allPlotsByPlotNumberWithBlock = async (req, res) => {
  try {
    const blockId = req.params.blockId;
    const plotNum = req.params.plotNum;

    const plot = await PlotModel.find({
      BlockNumber: blockId,
      plotNumber: plotNum,
    });

    if (!plot.length > 0)
      return res
        .status(404)
        .send({ success: false, message: "No plot found on that Id!" });

    res.status(200).send({ success: true, data: plot });
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      meessage: "Internal server error!",
      error,
    });
  }
};

// Plan
// const createingPlan = async (req, res) => {
//   try {
//     const planData = req.body;
//     const plotId = planData.plotId;
//     const plot = await Plot.findById(plotId);
//     if (!plot) {
//       return res
//         .status(404)
//         .send({ success: false, message: "No plot Found on that Id " });
//     }
//     const newPlanData = {
//       ...planData,
//       plotNumber: plot.plotNumber,
//       totalAmount: plot.price,
//       instalmentAmount: plot.price - planData.bookingAmount,
//     };

//     const newPlan = new PlanModel(newPlanData);

//     await newPlan.save();

//     res.status(200).send({ success: true, data: newPlan });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .send({ success: false, message: "Internal server error!", error });
//   }
// };

const createingPlan = async (req, res) => {
  try {
    const planData = req.body;
    const plotId = planData.plotId;
    const plot = await Plot.findById(plotId);

    if (!plot) {
      return res
        .status(404)
        .send({ success: false, message: "No plot found with that ID" });
    }

    const startDate = new Date();
    const payments = [];

    for (let i = 1; i <= planData.investmentMonth; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);

      payments.push({
        installmentNumber: i,
        amount:
          i % planData.extraPaymentTerm === 0
            ? planData.instalmentAmount + planData.extraPaymentAmount
            : planData.instalmentAmount,
        status: "pending",
        dueDate,
      });
    }
    const newPlanData = {
      ...planData,
      plotNumber: plot.plotNumber,
      totalAmount: plot.price,
      payments,
    };

    const newPlan = new PlanModel(newPlanData);

    await newPlan.save();

    res.status(200).send({ success: true, data: newPlan });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const updatePlan = async (req, res) => {
  try {
    const {
      bookingAmount,
      instalmentAmount,
      investmentMonth,
      extraPaymentTerm,
      extraPaymentAmount,
      possessionAmount,
      plotId,
    } = req.body;
    const planId = req.params.planId;
    const plan = await PlanModel.findById(planId);

    if (!plan) {
      return res
        .status(400)
        .send({ success: true, message: "No plan found on that Id" });
    }

    plan.extraPaymentAmount = extraPaymentAmount || plan.extraPaymentAmount;
    plan.plotId = plotId || plan.plotId;
    plan.bookingAmount = bookingAmount || plan.bookingAmount;
    plan.instalmentAmount = instalmentAmount || plan.instalmentAmount;
    plan.investmentMonth = investmentMonth || plan.investmentMonth;
    plan.extraPaymentTerm = extraPaymentTerm || plan.extraPaymentTerm;
    plan.possessionAmount = possessionAmount || plan.possessionAmount;
    console.log(plotId);
    if (plotId) {
      console.log(plan);
      const plot = await Plot.findById(plotId);

      const newPlanData = await PlanModel.findByIdAndUpdate(
        planId,
        {
          plotNumber: plot.plotNumber,
          totalAmount: plot.price,
        },
        { new: true }
      );
      await newPlanData.save();
    }

    // res.status(200).send({ success: true, data: newPlan });
    await plan.save();

    res.status(200).send({ success: true, data: plan });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const getAllPlan = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }

    const total = await PlanModel.countDocuments();

    const totalPages = Math.ceil(total / limit);

    const allData = await PlanModel.find().skip(skip).limit(limit).sort(sortBY);

    if (!allData > 0) {
      return res
        .status(400)
        .send({ success: false, message: "No Plan found!" });
    }

    res
      .status(200)
      .send({ success: true, data: allData, page, totalPages, limit, total });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const getOnePlan = async (req, res) => {
  try {
    const planId = req.params.planId;
    const plan = await PlanModel.findById(planId).populate("plotId");
    if (!plan) {
      return res
        .status(400)
        .send({ success: false, message: "No plan found on that Id" });
    }

    res.status(200).send({ success: true, data: plan });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const deletePlan = async (req, res) => {
  try {
    const planId = req.params.planId;
    const plan = await PlanModel.findByIdAndDelete(planId);
    if (!plan)
      return res
        .status(400)
        .send({ success: false, message: "No plan found on that Id" });
    res
      .status(200)
      .send({ success: true, message: "Plan Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

//Panelty
const createPanelty = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { amount, reason, date } = req.body;
    if (!amount || !reason || date) {
      return res.status(404).send({
        success: false,
        message: "You have to provide amount, date and reason to add panelty",
      });
    }

    const newPanelty = new Panelty({
      amount,
      reason,
      date,
      userId,
    });

    await newPanelty.save();

    const user = await User.findById(userId);
    user.panelty = newPanelty._id;

    await user.save();

    res.status(200).send({
      success: true,
      data: newPanelty,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
};

const payPanelty = async (req, res) => {
  try {
    const paneltyId = req.params.paneltyId;
    const panelty = await Panelty.findById(paneltyId);
    if (!panelty) {
      return res
        .status(404)
        .send({ success: false, message: "No panelty found onn that id" });
    }
    panelty.paid = true;
    await panelty.save();
    res.status(200).send({ success: true, message: "Panelty Paid" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error ", error });
  }
};

const updatePanelty = async (req, res) => {
  try {
    const paneltyId = req.params.paneltyId;
    const panelty = await Panelty.findById(paneltyId);
    console.log(panelty);
    const { userId, amount, date, reason } = req.body;

    panelty.userId = userId || panelty.userId;
    panelty.amount = amount || panelty.amount;
    panelty.reason = reason || panelty.reason;
    panelty.date = date || panelty.date;

    await panelty.save();

    res.status(200).send({
      success: true,
      data: panelty,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
};

const userPanelty = async (req, res) => {
  try {
    const userId = req.params.userId;
    const panelty = await Panelty.find({ userId });
    if (panelty.length <= 0) {
      return res
        .status(404)
        .send({ success: false, message: "No panelty found on that user" });
    }
    res.status(200).send({ success: true, data: panelty });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error ",
      error,
    });
  }
};

const onePanelty = async (req, res) => {
  try {
    const paneltyId = req.params.paneltyId;
    const panelty = await Panelty.findById(paneltyId);
    console.log(panelty);
    if (!panelty.length <= 0 || panelty == null) {
      return res
        .status(404)
        .send({ success: false, message: "No panelty found on that Id" });
    }
    res.status(200).send({ success: true, data: panelty });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error ",
      error,
    });
  }
};

const allPanelty = async (req, res) => {
  try {
    const panelty = await Panelty.find();
    if (panelty.length <= 0) {
      return res
        .status(404)
        .send({ success: false, message: "No panelty found " });
    }
    res.status(200).send({ success: true, data: panelty });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error ",
      error,
    });
  }
};

const deletPanelty = async (req, res) => {
  try {
    const id = req.params.paneltyId;
    const panelty = await Panelty.findByIdAndDelete(id);
    if (!panelty) {
      return res
        .status(400)
        .send({ success: false, message: "no panelty found" });
    }
    res.status(200).send({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

//payment
const payment = async (req, res) => {
  try {
    const planId = req.params.planId;
    const plan = await Plan.findById(planId);
    const payments = plan.payments;
    // console.logss(payments);

    const firstPendingPayment = payments.find(
      (payment) => payment.status === "pending"
    );
    console.log(firstPendingPayment);
    if (!firstPendingPayment) {
      console.log("No pending payments found");
    }
    firstPendingPayment.status = "paid";
    plan.save();

    return res.status(200).send({ success: true, data: "somthing is comming" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error! " });
  }
};

const userPayment = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const planId = user.planId;

    const plotData = [];

    for (let i = 0; i < planId.length; i++) {
      const element = planId[i];
      const plan = await Plan.findById(element);

      const id = plan._id;
      const plotNumber = plan.plotNumber;
      const payments = plan.payments;

      const firstPendingPayment = payments.find(
        (payment) => payment.status === "pending"
      );

      if (firstPendingPayment) {
        plotData.push({
          _id: id,
          plotNumber: plotNumber,
          firstPendingPayment: {
            installmentNumber: firstPendingPayment.installmentNumber,
            amount: firstPendingPayment.amount,
            dueDate: firstPendingPayment.dueDate,
          },
        });
      } else {
        plotData.push({
          plotNumber: plotNumber,
          message: "No pending payments found",
        });
      }
    }

    console.log(plotData);
    res.status(200).send({ success: true, data: plotData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createingBlock,
  updateBlock,
  getAllBlock,
  getOneBlock,
  deleteBlock,
  createingPlot,
  multiplePlot,
  updatePlot,
  getAllPlot,
  getOnePlot,
  getUserPlot,
  deletePlot,
  searchPlotByUser,
  allPlotsByBlock,
  allPlotsByPlotNumberWithBlock,
  createingPlan,
  updatePlan,
  getAllPlan,
  getOnePlan,
  deletePlan,
  createPanelty,
  payPanelty,
  updatePanelty,
  userPanelty,
  onePanelty,
  allPanelty,
  deletPanelty,
  payment,
  userPayment,
};
