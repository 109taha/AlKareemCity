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
} = require("../controllers/investmentController.js");
const {
  allAmount,
  paymentAmount,
} = require("../controllers/flowController.js");

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
router.delete("/deletePlot/:plotId", deletePlot);
router.get("/searchPlotByUser/:ownerName", searchPlotByUser);
router.get("/allPlotsByBlock/:blockId", allPlotsByBlock);

// plans
router.post("/createingPlan", planJoi, createingPlan);
router.post("/updatePlan/:planId", updatePlan);
router.get("/getAllPlan", getAllPlan);
router.get("/getOnePlan/:planId", getOnePlan);
router.delete("/deletePlan/:planId", deletePlan);

//panelty
router.post("/createPanelty/:userId", createPanelty);
router.put("/updatePanelty/:paneltyId", updatePanelty);
router.get("/userPanelty/:userId", userPanelty);
router.get("/onePanelty/:paneltyId", onePanelty);
router.get("/allPanelty", allPanelty);

//flow
router.get("/allAmount/:userId", allAmount);
router.post("/paymentAmount/:userId", paymentAmount);

module.exports = router;
