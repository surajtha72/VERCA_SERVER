import express from "express";
import * as ProductsSoldToFarmerController from "../controllers/ProductsSoldToFarmerController";
import { VerifyToken, VerifyUser } from "../Authorization";

let productSoldTofarmerRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product Sold to Farmer
 *   description: Endpoints for Product Sold to Farmer
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllProductSoldToFarmerModel:
 *       type: object
 *       required:
 *         - id
 *         - productSalesToFarmer
 *         - productId
 *         - quantity
 *         - rate
 *       properties:
 *         id:
 *           type: number
 *         productSalesToFarmer:
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
 * /api/v1/product_sold_to_farmer:
 *   get:
 *     tags: [Product Sold to Farmer]
 *     summary: Retrieve Product Sold to Farmer
 *     description: Retrieve all Product Sold to Farmer Characteristics. If `id` query parameter is provided, it returns a single product sold to farmer characteristic. Otherwise, it returns all Product Sold to Farmer characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Product Sold to Farmer
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
 *                     $ref: '#/components/schemas/AllProductSoldToFarmerModel'
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
productSoldTofarmerRouter.get("/", VerifyToken, VerifyUser("Read", "Products"), ProductsSoldToFarmerController.GetProductsSoldToFarmer);

/**
 * @swagger
 * /api/v1/product_sold_to_farmer:
 *   post:
 *     tags: [Product Sold to Farmer]
 *     summary: Create Product Sold to Farmer
 *     description: Create a new Product Sold to Farmer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AllProductSoldToFarmerModel'
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
productSoldTofarmerRouter.post("/",VerifyToken, VerifyUser("Create", "Products"), ProductsSoldToFarmerController.CreateProductSoldToFarmer);

export { productSoldTofarmerRouter }