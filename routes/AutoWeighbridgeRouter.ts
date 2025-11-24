import express from "express";
import * as AutoWeighbridgeController from "../controllers/AutoWeighbridgeController";
import { VerifyToken, VerifyUser } from "../Authorization";

const autoWeighBridgeRouter = express.Router();

autoWeighBridgeRouter.get("/", VerifyToken, VerifyUser("read", "WeighBridge"), AutoWeighbridgeController.GetAutoWeighbridgeData);

export {autoWeighBridgeRouter};