import express from "express";
import * as ProductSalesToNonAgentsController from "../controllers/ProductsSalesToNonAgentsController";
import { VerifyToken, VerifyUser } from "../Authorization";

let productSalesToNonAgentsRouter = express.Router();

productSalesToNonAgentsRouter.get("/", VerifyToken, VerifyUser("Read", "Products"), ProductSalesToNonAgentsController.GetProductSalesToNonAgents);

productSalesToNonAgentsRouter.post("/",VerifyToken, VerifyUser("Create", "Products"), ProductSalesToNonAgentsController.CreateProductSalesToNonAgents);

productSalesToNonAgentsRouter.get("/otp", VerifyToken, VerifyUser("Read", "Products"), ProductSalesToNonAgentsController.GetOtp);

productSalesToNonAgentsRouter.post("/otp",VerifyToken, VerifyUser("Create", "Products"), ProductSalesToNonAgentsController.CreateOtp);

productSalesToNonAgentsRouter.put("/",VerifyToken, VerifyUser("Update", "Products"), ProductSalesToNonAgentsController.UpdateProductSalesToNonAgents);

productSalesToNonAgentsRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Products"), ProductSalesToNonAgentsController.DeleteProductSalesToNonAgents);

/**
 * @swagger
 * tags:
 *   name: Product Sales to Non Agents
 *   description: Endpoints for Product Sales to NonAgents
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllProductSalesToNonAgentsModel:
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
 * /api/v1/product_sales_to_nonagents/total_balance:
 *   get:
 *     tags: [Product Sales to Non Agents]
 *     summary: Retrieve Product Sales balance to Non Agents
 *     description: Retrieve all Product Sales balance to Non Agents Characteristics. If `id` query parameter is provided, it returns a single product Sales to Non Agents characteristic. Otherwise, it returns all Product Sales to Non Agents characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Product Sales to Non Agents
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
 *                     $ref: '#/components/schemas/AllProductSalesToNonAgentsModel'
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
productSalesToNonAgentsRouter.get("/total_balance",  ProductSalesToNonAgentsController.GetTotalBalance);

export { productSalesToNonAgentsRouter }