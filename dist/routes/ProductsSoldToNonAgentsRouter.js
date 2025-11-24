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
exports.productSoldToNonAgentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductsSoldToNonAgentsController = __importStar(require("../controllers/ProductsSoldToNonAgentsController"));
const Authorization_1 = require("../Authorization");
let productSoldToNonAgentsRouter = express_1.default.Router();
exports.productSoldToNonAgentsRouter = productSoldToNonAgentsRouter;
/**
 * @swagger
 * tags:
 *   name: Product Sold to Non Agents
 *   description: Endpoints for Product Sold to Non Agents
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllProductSoldToNonAgentsModel:
 *       type: object
 *       required:
 *         - id
 *         - productSalesToNonAgents
 *         - productId
 *         - quantity
 *         - rate
 *       properties:
 *         id:
 *           type: number
 *         productSalesToNonAgents:
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
 * /api/v1/product_sold_to_nonagents:
 *   get:
 *     tags: [Product Sold to Non Agents]
 *     summary: Retrieve Product Sold to Non Agents
 *     description: Retrieve all Product Sold to NonAgents Characteristics. If `id` query parameter is provided, it returns a single product sold to NonAgents characteristic. Otherwise, it returns all Product Sold to NonAgents characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Product Sold to NonAgents
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
 *                     $ref: '#/components/schemas/AllProductSoldToNonAgentsModel'
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
productSoldToNonAgentsRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Products"), ProductsSoldToNonAgentsController.GetProductsSoldToNonAgents);
/**
 * @swagger
 * /api/v1/product_sold_to_nonagents:
 *   post:
 *     tags: [Product Sold to Non Agents]
 *     summary: Create Product Sold to Non Agents
 *     description: Create a new Product Sold to Non Agents.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AllProductSoldToNonAgentsModel'
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
productSoldToNonAgentsRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Products"), ProductsSoldToNonAgentsController.CreateProductSoldToNonAgents);
