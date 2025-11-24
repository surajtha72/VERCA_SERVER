import express from "express";
import * as ProductSupplyController from "../controllers/ProductSupplyController";
import { VerifyToken, VerifyUser } from "../Authorization";

const productSupplyIndentRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product Supply Indent
 *   description: Endpoints for Product Supply Indent
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
 * /api/v1/product_supply_indent:
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
productSupplyIndentRouter.get("/", VerifyToken, VerifyUser("Read", "Products Supply Indent"), ProductSupplyController.GetProductSupplyIndent);


export { productSupplyIndentRouter };
