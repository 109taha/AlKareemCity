import BlockModel from "../models/BlocksModel.js";
import PlotModel from "../models/PlotModel.js";
import PlanModel from "../models/PlansModel.js";

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

    const newBlock = new BlockModel({
      blockName: blockData.blockName,
      totalNumberOfPlot: blockData.totalNumberOfPlot,
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

// Plan
const createingPlan = async (req, res) => {
  try {
    const planData = req.body;

    const newPlan = new PlanModel({
      sqYard: planData.sqYard,
      blockId: planData.blockId,
      bookingAmount: planData.bookingAmount,
      instalmentAmount: planData.instalmentAmount,
      investmentMonth: planData.investmentMonth,
      extraPaymentTerm: planData.extraPaymentTerm,
      possessionAmount: planData.possessionAmount,
    });

    await newPlan.save();

    res.status(200).send({ success: true, data: newPlan });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error!", error });
  }
};

const updatePlan = async (req, res) => {
  try {
    const {
      sqYard,
      blockId,
      bookingAmount,
      instalmentAmount,
      investmentMonth,
      extraPaymentTerm,
      possessionAmount,
    } = req.body;
    const planId = req.params.planId;
    const plan = await PlanModel.findById(planId);

    if (!plan) {
      return res
        .status(400)
        .send({ success: true, message: "No plan found on that Id" });
    }

    plan.sqYard = sqYard || plan.sqYard;
    plan.blockId = blockId || plan.blockId;
    plan.bookingAmount = bookingAmount || plan.bookingAmount;
    plan.instalmentAmount = instalmentAmount || plan.instalmentAmount;
    plan.investmentMonth = investmentMonth || plan.investmentMonth;
    plan.extraPaymentTerm = extraPaymentTerm || plan.extraPaymentTerm;
    plan.possessionAmount = possessionAmount || plan.possessionAmount;

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

    const allData = await PlanModel.find()
      .populate({
        path: "blockId",
        select: "blockName",
      })
      .skip(skip)
      .limit(limit)
      .sort(sortBY);

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
    const plan = await PlanModel.findById(planId).populate({
      path: "blockId",
      select: "blockName totalNumberOfPlot",
    });
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

export {
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
  deletePlot,
  createingPlan,
  updatePlan,
  getAllPlan,
  getOnePlan,
  deletePlan,
};
