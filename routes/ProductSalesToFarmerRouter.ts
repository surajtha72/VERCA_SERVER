import express from "express";
import * as ProductSalesToFarmerController from "../controllers/ProductsSalesToFarmerController";
import { VerifyToken, VerifyUser } from "../Authorization";

let productSalesToFarmerRouter = express.Router();

productSalesToFarmerRouter.get("/", VerifyToken, VerifyUser("Read", "Products"), ProductSalesToFarmerController.GetProductSalesToFarmer);

productSalesToFarmerRouter.post("/",VerifyToken, VerifyUser("Create", "Products"), ProductSalesToFarmerController.CreateProductSalesToFarmer);

productSalesToFarmerRouter.get("/otp", VerifyToken, VerifyUser("Read", "Products"), ProductSalesToFarmerController.GetOtp);

productSalesToFarmerRouter.post("/otp",VerifyToken, VerifyUser("Create", "Products"), ProductSalesToFarmerController.CreateOtp);

productSalesToFarmerRouter.put("/",VerifyToken, VerifyUser("Update", "Products"), ProductSalesToFarmerController.UpdateProductSalesToFarmer);

productSalesToFarmerRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Products"), ProductSalesToFarmerController.DeleteProductSalesToFarmer);

/**
 * @swagger
 * tags:
 *   name: Product Sales to Farmer
 *   description: Endpoints for Product Sales to Farmer
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllProductSalesToFarmerModel:
 *       type: object
 *       required:
 *         - id
 *         - invoiceNumber
 *         - totalAmount
 *         - paymentMode
 *         - paidAmount
 *         - balance
 *       properties:
 *         id:
 *           type: number
 *         invoiceNumber:
 *           type: number
 *         totalAmount:
 *           type: number
 *         paymentMode: 
 *           type: string
 *         paidAmount:
 *           type: number
 *         balance:
 *           type: number
 */

/**
 * @swagger
 * /api/v1/product_sales_to_farmer/total_balance:
 *   get:
 *     tags: [Product Sales to Farmer]
 *     summary: Retrieve Product Sales balance to Farmer
 *     description: Retrieve all Product Sales balance to Farmer Characteristics. If `id` query parameter is provided, it returns a single product Sales to farmer characteristic. Otherwise, it returns all Product Sales to Farmer characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Product Sales to Farmer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AllProductSalesToFarmerModel'
 *       '500':
 *         description: "Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 data:
 *                   type: object
 *                   example: null
 */
productSalesToFarmerRouter.get("/total_balance",  ProductSalesToFarmerController.GetTotalBalance);

export { productSalesToFarmerRouter }