import express from "express";
const router = express.Router();
import { blockJoi, planJoi, plotJoi } from "../utils/Schemas.js";
import {
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
} from "../controllers/investmentController.js";

// block
router.post("/createingBlock", blockJoi, createingBlock);
router.post("/updateBlock", updateBlock);
router.get("/getAllBlock", getAllBlock);
router.get("/getOneBlock", getOneBlock);
router.delete("/deleteBlock", deleteBlock);

// plot
router.post("/createingPlot", plotJoi, createingPlot);
router.post("/updatePlot", updatePlot);
router.get("/getAllPlot", getAllPlot);
router.get("/getOnePlot", getOnePlot);
router.delete("/deletePlot", deletePlot);

// plans
router.post("/createingPlan", planJoi, createingPlan);
router.post("/updatePlan", updatePlan);
router.get("/getAllPlan", getAllPlan);
router.get("/getOnePlan", getOnePlan);
router.delete("/deletePlan", deletePlan);

export default router;
