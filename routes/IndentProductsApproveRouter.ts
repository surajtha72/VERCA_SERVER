import express from "express";
import * as IndentProductsController from "../controllers/IndentProductsController";
import { VerifyToken, VerifyUser } from "../Authorization";

const indentProductsApproveRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Indent Products Approve
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
 * /api/v1/indent_products_approve:
 *   put:
 *     tags: [Indent Products Approve]
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
indentProductsApproveRouter.put("/", VerifyToken, VerifyUser("Update", "Products"), IndentProductsController.UpdateIndentProductsApprove);


export { indentProductsApproveRouter };
