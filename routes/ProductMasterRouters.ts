import express from "express";
import * as ProductMasterController from "../controllers/ProductMasterController";
import { VerifyToken, VerifyUser } from "../Authorization";

const productMasterRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product Master
 *   description: Endpoints for Product Master
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllProductMasterModel:
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
 * /api/v1/product_master:
 *   get:
 *     tags: [Product Master]
 *     summary: Retrieve Product Master
 *     description: Retrieve all Product Master Characteristics. If `id` query parameter is provided, it returns a single product master characteristic. Otherwise, it returns all Product Master characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Product Master
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
 *                     $ref: '#/components/schemas/AllProductMasterModel'
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
productMasterRouter.get("/", VerifyToken, VerifyUser("Read", "Products"), ProductMasterController.GetProductMaster);

/**
 * @swagger
 * /api/v1/product_master:
 *   post:
 *     tags: [Product Master]
 *     summary: Create Product Master
 *     description: Create a new Product Master.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AllProductMasterModel'
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
productMasterRouter.post("/", VerifyToken, VerifyUser("Create", "Products"), ProductMasterController.CreateProductMaster);

/**
 * @swagger
 * /api/v1/product_master:
 *   put:
 *     tags: [Product Master]
 *     summary: Update Product Master
 *     description: Update a Product Master.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllProductMasterModel'
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
productMasterRouter.put("/", VerifyToken, VerifyUser("Update", "Products"), ProductMasterController.UpdateProductMaster);

/**
 * @swagger
 * /api/v1/product_master/{id}:
 *   delete:
 *     tags: [Product Master]
 *     summary: Delete Product Master
 *     description: Delete a Product Master by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Product Master to delete
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
productMasterRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Products"), ProductMasterController.DeleteProductMaster);

export { productMasterRouter };
