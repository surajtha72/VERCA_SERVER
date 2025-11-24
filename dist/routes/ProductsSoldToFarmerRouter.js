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
exports.productSoldTofarmerRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductsSoldToFarmerController = __importStar(require("../controllers/ProductsSoldToFarmerController"));
const Authorization_1 = require("../Authorization");
let productSoldTofarmerRouter = express_1.default.Router();
exports.productSoldTofarmerRouter = productSoldTofarmerRouter;
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
productSoldTofarmerRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Products"), ProductsSoldToFarmerController.GetProductsSoldToFarmer);
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
productSoldTofarmerRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Products"), ProductsSoldToFarmerController.CreateProductSoldToFarmer);
