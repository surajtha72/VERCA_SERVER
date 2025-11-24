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
exports.productSupplyRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductSupplyController = __importStar(require("../controllers/ProductSupplyController"));
const Authorization_1 = require("../Authorization");
const productSupplyRouter = express_1.default.Router();
exports.productSupplyRouter = productSupplyRouter;
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
productSupplyRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Products"), ProductSupplyController.GetProductSupplyApprove);
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
productSupplyRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Products"), ProductSupplyController.CreateProductSupply);
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
productSupplyRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "Products"), ProductSupplyController.UpdateProductSupply);
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
productSupplyRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "Products"), ProductSupplyController.DeleteProductSupply);
