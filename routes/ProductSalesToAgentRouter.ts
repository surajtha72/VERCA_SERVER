import express from "express";
import * as ProductSalesToAgentController from "../controllers/ProductSalesToAgentController";
import { VerifyToken, VerifyUser } from "../Authorization";

let productSalesToAgentRouter = express.Router();

productSalesToAgentRouter.get("/", VerifyToken, VerifyUser("Read", "Products"), ProductSalesToAgentController.GetProductSalesToAgent);

productSalesToAgentRouter.post("/",VerifyToken, VerifyUser("Create", "Products"), ProductSalesToAgentController.CreateProductSalesToAgent);

productSalesToAgentRouter.get("/otp", VerifyToken, VerifyUser("Read", "Products"), ProductSalesToAgentController.GetOtp);

productSalesToAgentRouter.post("/otp",VerifyToken, VerifyUser("Create", "Products"), ProductSalesToAgentController.CreateOtp);

productSalesToAgentRouter.put("/",VerifyToken, VerifyUser("Update", "Products"), ProductSalesToAgentController.UpdateProductSalesToAgent);

productSalesToAgentRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Products"), ProductSalesToAgentController.DeleteProductSale);

productSalesToAgentRouter.get("/total_balance",  ProductSalesToAgentController.GetTotalBalance);

export { productSalesToAgentRouter }