"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPurchaseQtyRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductPurchaseQtyController = __importStar(require("../controllers/ProductPurchaseQtyController"));
const Authorization_1 = require("../Authorization");
const productPurchaseQtyRouter = express_1.default.Router();
exports.productPurchaseQtyRouter = productPurchaseQtyRouter;
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
productPurchaseQtyRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Products"), ProductPurchaseQtyController.GetProductPurchaseQty);
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
productPurchaseQtyRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Products"), ProductPurchaseQtyController.CreateProductPurchaseQty);
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
productPurchaseQtyRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "Products"), ProductPurchaseQtyController.UpdateProductPurchaseQty);
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
productPurchaseQtyRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "Products"), ProductPurchaseQtyController.DeleteproductPurchaseQty);
