const express = require("express");
const router = express.Router();
const {
  blockJoi,
  planJoi,
  plotJoi,
  plotJoiArray,
} = require("../utils/Schemas.js");
const {
  createingBlock,
  updateBlock,
  getAllBlock,
  getOneBlock,
  deleteBlock,
  createingPlot,
  updatePlot,
  getAllPlot,
  getOnePlot,
  deletePlot,
  createingPlan,
  updatePlan,
  getAllPlan,
  getOnePlan,
  deletePlan,
  multiplePlot,
  searchPlotByUser,
  allPlotsByBlock,
  createPanelty,
  updatePanelty,
  userPanelty,
  onePanelty,
  allPanelty,
  allPlotsByPlotNumberWithBlock,
  getUserPlot,
  payment,
  userPayment,
  payPanelty,
  deletPanelty,
} = require("../controllers/investmentController.js");

// block
router.post("/createingBlock", blockJoi, createingBlock);
router.post("/updateBlock/:blockId", updateBlock);
router.get("/getAllBlock", getAllBlock);
router.get("/getOneBlock/:blockId", getOneBlock);
router.delete("/deleteBlock/:blockId", deleteBlock);

// plot
router.post("/createingPlot", plotJoi, createingPlot);
router.post("/multiplePlot", plotJoiArray, multiplePlot);
router.post("/updatePlot/:plotId", updatePlot);
router.get("/getAllPlot", getAllPlot);
router.get("/getOnePlot/:plotId", getOnePlot);
router.get("/getUserPlot/:userId", getUserPlot);
router.delete("/deletePlot/:plotId", deletePlot);
router.get("/searchPlotByUser/:ownerName", searchPlotByUser);
router.get("/allPlotsByBlock/:blockId", allPlotsByBlock);
router.get(
  "/allPlotsByPlotNumberWithBlock/:blockId/:plotNum",
  allPlotsByPlotNumberWithBlock
);

// plans
router.post("/createingPlan", planJoi, createingPlan);
router.post("/updatePlan/:planId", updatePlan);
router.get("/getAllPlan", getAllPlan);
router.get("/getOnePlan/:planId", getOnePlan);
router.delete("/deletePlan/:planId", deletePlan);

//panelty
router.post("/createPanelty/:userId", createPanelty);
router.post("/payPanelty/:paneltyId", payPanelty);
router.put("/updatePanelty/:paneltyId", updatePanelty);
router.get("/userPanelty/:userId", userPanelty);
router.get("/onePanelty/:paneltyId", onePanelty);
router.get("/allPanelty", allPanelty);
router.delete("/deletPanelty/:paneltyId", deletPanelty);

//payment
router.post("/payment/:planId", payment);
router.get("/userPayment/:userId", userPayment);

module.exports = router;
