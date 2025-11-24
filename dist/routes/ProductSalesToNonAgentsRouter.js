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
exports.productSalesToNonAgentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductSalesToNonAgentsController = __importStar(require("../controllers/ProductsSalesToNonAgentsController"));
const Authorization_1 = require("../Authorization");
let productSalesToNonAgentsRouter = express_1.default.Router();
exports.productSalesToNonAgentsRouter = productSalesToNonAgentsRouter;
productSalesToNonAgentsRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Products"), ProductSalesToNonAgentsController.GetProductSalesToNonAgents);
productSalesToNonAgentsRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Products"), ProductSalesToNonAgentsController.CreateProductSalesToNonAgents);
productSalesToNonAgentsRouter.get("/otp", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Products"), ProductSalesToNonAgentsController.GetOtp);
productSalesToNonAgentsRouter.post("/otp", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Products"), ProductSalesToNonAgentsController.CreateOtp);
productSalesToNonAgentsRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "Products"), ProductSalesToNonAgentsController.UpdateProductSalesToNonAgents);
productSalesToNonAgentsRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "Products"), ProductSalesToNonAgentsController.DeleteProductSalesToNonAgents);
/**
 * @swagger
 * tags:
 *   name: Product Sales to Non Agents
 *   description: Endpoints for Product Sales to NonAgents
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllProductSalesToNonAgentsModel:
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
 * /api/v1/product_sales_to_nonagents/total_balance:
 *   get:
 *     tags: [Product Sales to Non Agents]
 *     summary: Retrieve Product Sales balance to Non Agents
 *     description: Retrieve all Product Sales balance to Non Agents Characteristics. If `id` query parameter is provided, it returns a single product Sales to Non Agents characteristic. Otherwise, it returns all Product Sales to Non Agents characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Product Sales to Non Agents
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
 *                     $ref: '#/components/schemas/AllProductSalesToNonAgentsModel'
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
productSalesToNonAgentsRouter.get("/total_balance", ProductSalesToNonAgentsController.GetTotalBalance);
