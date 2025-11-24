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
exports.indentProductsApproveRouter = void 0;
const express_1 = __importDefault(require("express"));
const IndentProductsController = __importStar(require("../controllers/IndentProductsController"));
const Authorization_1 = require("../Authorization");
const indentProductsApproveRouter = express_1.default.Router();
exports.indentProductsApproveRouter = indentProductsApproveRouter;
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
indentProductsApproveRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "Products"), IndentProductsController.UpdateIndentProductsApprove);
