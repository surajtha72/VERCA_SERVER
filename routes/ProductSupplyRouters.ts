import express from "express";
import * as ProductSupplyController from "../controllers/ProductSupplyController";
import { VerifyToken, VerifyUser } from "../Authorization";

const productSupplyRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product Supply
 *   description: Endpoints for Product Supply
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllProductSupplyModel:
 *       type: object
 *       required:
 *         - indentRaisedOnDate
 *         - indentProductId
 *         - indentQuantity
 *         - unitPrice
 *       properties:
 *         indentRaisedOnDate:
 *           type: string
 *           format: date-time
 *         indentProductId:
 *           type: number
 *         indentQuantity:
 *           type: number
 *         unitPrice:
 *           type: number
 */

/**
 * @swagger
 * /api/v1/product_supply:
 *   get:
 *     tags: [Product Supply]
 *     summary: Retrieve Product Supply
 *     description: Retrieve all Product Supply Characteristics. If `id` query parameter is provided, it returns a single product supply characteristic. Otherwise, it returns all Product Supply characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Product Supply
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
 *                     $ref: '#/components/schemas/AllProductSupplyModel'
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
productSupplyRouter.get("/", VerifyToken, VerifyUser("Read", "Products"), ProductSupplyController.GetProductSupplyApprove);

/**
 * @swagger
 * /api/v1/product_supply:
 *   post:
 *     tags: [Product Supply]
 *     summary: Create Product Supply
 *     description: Create a new Product Supply.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AllProductSupplyModel'
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
productSupplyRouter.post("/", VerifyToken, VerifyUser("Create", "Products"), ProductSupplyController.CreateProductSupply);

// productSupplyRouter.post("/", VerifyToken, VerifyUser("Create", "Products"), ProductSupplyController.CreateProductSupplyBMC);

/**
 * @swagger
 * /api/v1/product_supply:
 *   put:
 *     tags: [Product SupplyD]
 *     summary: Update Product Supply
 *     description: Update a Product Supply.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllProductSupplyModel'
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
 *                   example: "Updated Successfully"
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
productSupplyRouter.put("/", VerifyToken, VerifyUser("Update", "Products"), ProductSupplyController.UpdateProductSupply);

/**
 * @swagger
 * /api/v1/product_supply/{id}:
 *   delete:
 *     tags: [Product Supply]
 *     summary: Delete Product Supply
 *     description: Delete a Product Supply by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Product Supply to delete
 *         required: true
 *         schema:
 *           type: integer
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
 *                   example: "Deleted Successfully"
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
productSupplyRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Products"), ProductSupplyController.DeleteProductSupply);

export { productSupplyRouter };
