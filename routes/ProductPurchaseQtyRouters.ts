import express from "express";
import * as ProductPurchaseQtyController from "../controllers/ProductPurchaseQtyController";
import { VerifyToken, VerifyUser } from "../Authorization";

const productPurchaseQtyRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product Purchase
 *   description: Endpoints for Product Purchase
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllProductMasterModel:
 *       type: object
 *       required:
 *         - id
 *         - productId
 *         - invoiceNo
 *         - quantity
 *         - isActive
 *       properties:
 *         id:
 *           type: number
 *         productId:
 *           type: number
 *         invoiceNo: 
 *           type: string
 *         quantity:
 *           type: number
 *         isActive:
 *           type: boolean
 */

/**
 * @swagger
 * /api/v1/product_purchase:
 *   get:
 *     tags: [Product Purchase]
 *     summary: Retrieve Product Purchase
 *     description: Retrieve all Product Purchase Characteristics. If `id` query parameter is provided, it returns a single product purchase characteristic. Otherwise, it returns all Product Purchase characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Product Purchase
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
 *                     $ref: '#/components/schemas/AllProductPurchaseQtyModel'
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
productPurchaseQtyRouter.get("/", VerifyToken, VerifyUser("Read", "Products"), ProductPurchaseQtyController.GetProductPurchaseQty);

/**
 * @swagger
 * /api/v1/product_purchase:
 *   post:
 *     tags: [Product Purchase]
 *     summary: Create Product Purchase
 *     description: Create a new Product Purchase.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AllProductPurchaseQtyModel'
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
productPurchaseQtyRouter.post("/", VerifyToken, VerifyUser("Create", "Products"), ProductPurchaseQtyController.CreateProductPurchaseQty);

/**
 * @swagger
 * /api/v1/product_purchase:
 *   put:
 *     tags: [Product Purchase]
 *     summary: Update Product Purchase
 *     description: Update a Product Purchase.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllProductPurchaseQtyModel'
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
productPurchaseQtyRouter.put("/", VerifyToken, VerifyUser("Update", "Products"), ProductPurchaseQtyController.UpdateProductPurchaseQty);

/**
 * @swagger
 * /api/v1/product_purchase/{id}:
 *   delete:
 *     tags: [Product Purchase]
 *     summary: Delete Product Purchase
 *     description: Delete a Product Purchase by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Product Purchase to delete
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
productPurchaseQtyRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Products"), ProductPurchaseQtyController.DeleteproductPurchaseQty);

export { productPurchaseQtyRouter };
