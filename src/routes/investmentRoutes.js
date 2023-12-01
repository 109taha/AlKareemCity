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
router.post("/updateBlock/:blockId", updateBlock);
router.get("/getAllBlock", getAllBlock);
router.get("/getOneBlock/:blockId", getOneBlock);
router.delete("/deleteBlock/:blockId", deleteBlock);

// plot
router.post("/createingPlot", plotJoi, createingPlot);
router.post("/updatePlot/:plotId", updatePlot);
router.get("/getAllPlot", getAllPlot);
router.get("/getOnePlot/:plotId", getOnePlot);
router.delete("/deletePlot/:plotId", deletePlot);

// plans
router.post("/createingPlan", planJoi, createingPlan);
router.post("/updatePlan/:planId", updatePlan);
router.get("/getAllPlan", getAllPlan);
router.get("/getOnePlan/:planId", getOnePlan);
router.delete("/deletePlan/:planId", deletePlan);

export default router;
