import express from "express";
import * as ProductsSoldToNonAgentsController from "../controllers/ProductsSoldToNonAgentsController";
import { VerifyToken, VerifyUser } from "../Authorization";

let productSoldToNonAgentsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product Sold to Non Agents
 *   description: Endpoints for Product Sold to Non Agents
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllProductSoldToNonAgentsModel:
 *       type: object
 *       required:
 *         - id
 *         - productSalesToNonAgents
 *         - productId
 *         - quantity
 *         - rate
 *       properties:
 *         id:
 *           type: number
 *         productSalesToNonAgents:
 *           type: number
 *         productId: 
 *           type: number
 *         quantity:
 *           type: number
 *         rate:
 *           type: number
 */

/**
 * @swagger
 * /api/v1/product_sold_to_nonagents:
 *   get:
 *     tags: [Product Sold to Non Agents]
 *     summary: Retrieve Product Sold to Non Agents
 *     description: Retrieve all Product Sold to NonAgents Characteristics. If `id` query parameter is provided, it returns a single product sold to NonAgents characteristic. Otherwise, it returns all Product Sold to NonAgents characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Product Sold to NonAgents
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
 *                     $ref: '#/components/schemas/AllProductSoldToNonAgentsModel'
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
productSoldToNonAgentsRouter.get("/", VerifyToken, VerifyUser("Read", "Products"), ProductsSoldToNonAgentsController.GetProductsSoldToNonAgents);

/**
 * @swagger
 * /api/v1/product_sold_to_nonagents:
 *   post:
 *     tags: [Product Sold to Non Agents]
 *     summary: Create Product Sold to Non Agents
 *     description: Create a new Product Sold to Non Agents.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AllProductSoldToNonAgentsModel'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Added Successfully"
 *       '400':
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
productSoldToNonAgentsRouter.post("/",VerifyToken, VerifyUser("Create", "Products"), ProductsSoldToNonAgentsController.CreateProductSoldToNonAgents);

export { productSoldToNonAgentsRouter }