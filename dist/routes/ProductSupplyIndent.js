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
exports.productSupplyIndentRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductSupplyController = __importStar(require("../controllers/ProductSupplyController"));
const Authorization_1 = require("../Authorization");
const productSupplyIndentRouter = express_1.default.Router();
exports.productSupplyIndentRouter = productSupplyIndentRouter;
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
productSupplyIndentRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Products Supply Indent"), ProductSupplyController.GetProductSupplyIndent);
