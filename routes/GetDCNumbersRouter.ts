import express from "express";
import * as ProductSupplyController from "../controllers/ProductSupplyController";
import { VerifyToken, VerifyUser } from "../Authorization";

const getDcNumbers = express.Router();

getDcNumbers.get("/", VerifyToken, VerifyUser("Read", "Products"), ProductSupplyController.GetDCNumbers);

export { getDcNumbers };
