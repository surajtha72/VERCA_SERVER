import express from "express";
import * as IndentProductsController from "../controllers/IndentProductsController";
import { VerifyToken, VerifyUser } from "../Authorization";

const indentProductsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Indent Products
 *   description: Endpoints for Indent Products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllIndentProductsModel:
 *       type: object
 *       required:
 *         - id
 *         - productCategId
 *         - productName
 *         - description
 *         - supplierMake
 *         - batchNo
 *         - mfgDate
 *         - expDate
 *         - recorderLevel
 *         - leadTimeInDelay
 *         - unitQtyUomId
 *         - unitQtyPurchasePrice
 *         - unitQtySupplyPrice
 *         - taxOnSupply
 *         - unitQtyIncentiveAmount
 *         - openingBalanceQty
 *         - openingBalanceDate
 *         - isActive
 *       properties:
 *         id:
 *           type: number
 *         productCategId:
 *           type: number
 *         productName: 
 *           type: string
 *         description:
 *           type: string
 *         supplierMake:
 *           type: string
 *         batchNo:
 *           type: string
 *         mfgDate:
 *           type: string
 *           format: date-time
 *         expDate:
 *           type: string
 *           format: date-time
 *         recorderLevel:
 *           type: number
 *         leadTimeInDelay:
 *           type: number
 *         unitQtyUomId:
 *           type: number
 *         unitQtyPurchasePrice:
 *           type: number
 *         unitQtySupplyPrice:
 *           type: number
 *         taxOnSupply:
 *           type: number
 *         unitQtyIncentiveAmount:
 *           type: number
 *         openingBalanceQty:
 *           type: number
 *         openingBalanceDate:
 *           type: number
 *         isActive:
 *           type: boolean
 */

/**
 * @swagger
 * /api/v1/indent_products:
 *   get:
 *     tags: [Indent Products]
 *     summary: Retrieve Indent Products
 *     description: Retrieve all Indent Products Characteristics. If `id` query parameter is provided, it returns a single product master characteristic. Otherwise, it returns all Indent Products characteristics.
 *     parameters:
 *       - in: query
 *         name: indentId
 *         schema:
 *           type: integer
 *         description: ID of the Indent Products
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
 *                     $ref: '#/components/schemas/AllIndentProductsModel'
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
indentProductsRouter.get("/", VerifyToken, VerifyUser("Read", "Products"), IndentProductsController.GetIndentProducts);

/**
 * @swagger
 * /api/v1/indent_products:
 *   post:
 *     tags: [Indent Products]
 *     summary: Create Indent Products
 *     description: Create a new Indent Products.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AllIndentProductsModel'
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
indentProductsRouter.post("/", VerifyToken, VerifyUser("Create", "Products"), IndentProductsController.CreateIndentProducts);

/**
 * @swagger
 * /api/v1/indent_products:
 *   put:
 *     tags: [Indent Products]
 *     summary: Update Indent Products
 *     description: Update a Indent Products.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllIndentProductsModel'
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
indentProductsRouter.put("/", VerifyToken, VerifyUser("Update", "Products"), IndentProductsController.UpdateIndentProducts);

/**
 * @swagger
 * /api/v1/indent_products/{id}:
 *   delete:
 *     tags: [Indent Products]
 *     summary: Delete Indent Products
 *     description: Delete a Indent Products by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Indent Products to delete
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
indentProductsRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Products"), IndentProductsController.DeleteIndentProducts);

export { indentProductsRouter };
