import express from "express";
import * as ProductStockController from "../controllers/ProductStockController";
import { VerifyToken, VerifyUser } from "../Authorization";

const productStockRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product Stock
 *   description: Endpoints for Product Stock
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllProductStockModel:
 *       type: object
 *       required:
 *         - indentId
 *         - orgUnitId
 *         - productId
 *         - availableQuantity
 *       properties:
 *         indentId:
 *         orgUnitId:
 *           type: number
 *         productId:
 *           type: number
 *         availableQuantity:
 *           type: number
 */

/**
 * @swagger
 * /api/v1/product_stock:
 *   get:
 *     tags: [Product Stock]
 *     summary: Retrieve Product Stock
 *     description: Retrieve all Product Stock Characteristics. If `id` query parameter is provided, it returns a single product Stock characteristic. Otherwise, it returns all Product Stock characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Product Stock
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
 *                     $ref: '#/components/schemas/AllProductStockModel'
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
productStockRouter.get("/", VerifyToken, VerifyUser("Read", "Products"), ProductStockController.GetProductStock);

/**
 * @swagger
 * /api/v1/product_stock:
 *   post:
 *     tags: [Product Stock]
 *     summary: Create Product Stock
 *     description: Create a new Product Stock.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AllProductStockModel'
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
productStockRouter.post("/", VerifyToken, VerifyUser("Create", "Products"), ProductStockController.CreateProductStock);

/**
 * @swagger
 * /api/v1/product_stock:
 *   put:
 *     tags: [Product Stock]
 *     summary: Update Product Stock
 *     description: Update a Product Stock.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllProductStockModel'
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
productStockRouter.put("/", VerifyToken, VerifyUser("Update", "Products"), ProductStockController.UpdateProductStock);

/**
 * @swagger
 * /api/v1/product_stock/{id}:
 *   delete:
 *     tags: [Product Stock]
 *     summary: Delete Product Stock
 *     description: Delete a Product Stock by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Product Stock to delete
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
productStockRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Products"), ProductStockController.DeleteProductStock);

export { productStockRouter };
