import express from "express";
import * as ProductsSoldToAgentController from "../controllers/ProductsSoldToAgentController";
import { VerifyToken, VerifyUser } from "../Authorization";

let productSoldToAgentRouter = express.Router();

productSoldToAgentRouter.get("/", VerifyToken, VerifyUser("Read", "Products"), ProductsSoldToAgentController.GetProductsSoldToAgent);

productSoldToAgentRouter.post("/",VerifyToken, VerifyUser("Create", "Products"), ProductsSoldToAgentController.CreateProductSoldToAgent);

export { productSoldToAgentRouter }