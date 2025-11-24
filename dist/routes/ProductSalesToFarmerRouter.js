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
exports.productSalesToFarmerRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductSalesToFarmerController = __importStar(require("../controllers/ProductsSalesToFarmerController"));
const Authorization_1 = require("../Authorization");
let productSalesToFarmerRouter = express_1.default.Router();
exports.productSalesToFarmerRouter = productSalesToFarmerRouter;
productSalesToFarmerRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Products"), ProductSalesToFarmerController.GetProductSalesToFarmer);
productSalesToFarmerRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Products"), ProductSalesToFarmerController.CreateProductSalesToFarmer);
productSalesToFarmerRouter.get("/otp", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Products"), ProductSalesToFarmerController.GetOtp);
productSalesToFarmerRouter.post("/otp", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Products"), ProductSalesToFarmerController.CreateOtp);
productSalesToFarmerRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "Products"), ProductSalesToFarmerController.UpdateProductSalesToFarmer);
productSalesToFarmerRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "Products"), ProductSalesToFarmerController.DeleteProductSalesToFarmer);
/**
 * @swagger
 * tags:
 *   name: Product Sales to Farmer
 *   description: Endpoints for Product Sales to Farmer
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllProductSalesToFarmerModel:
 *       type: object
 *       required:
 *         - id
 *         - invoiceNumber
 *         - totalAmount
 *         - paymentMode
 *         - paidAmount
 *         - balance
 *       properties:
 *         id:
 *           type: number
 *         invoiceNumber:
 *           type: number
 *         totalAmount:
 *           type: number
 *         paymentMode:
 *           type: string
 *         paidAmount:
 *           type: number
 *         balance:
 *           type: number
 */
/**
 * @swagger
 * /api/v1/product_sales_to_farmer/total_balance:
 *   get:
 *     tags: [Product Sales to Farmer]
 *     summary: Retrieve Product Sales balance to Farmer
 *     description: Retrieve all Product Sales balance to Farmer Characteristics. If `id` query parameter is provided, it returns a single product Sales to farmer characteristic. Otherwise, it returns all Product Sales to Farmer characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Product Sales to Farmer
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
 *                     $ref: '#/components/schemas/AllProductSalesToFarmerModel'
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
productSalesToFarmerRouter.get("/total_balance", ProductSalesToFarmerController.GetTotalBalance);
