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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCategoryRouter = void 0;
const express = __importStar(require("express"));
const ProductCategoryController = __importStar(require("../controllers/ProductCategoryController"));
const Authorization_1 = require("../Authorization");
let productCategoryRouter = express.Router();
exports.productCategoryRouter = productCategoryRouter;
/**
 * @swagger
 * tags:
 *   name: Product Category
 *   description: Endpoints for Product category
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllProductCategoryModel:
 *       type: object
 *       required:
 *         - id
 *         - categoryName
 *         - shortDescription
 *         - isActive
 *       properties:
 *         id:
 *           type: number
 *         categoryName:
 *           type: string
 *         shortDescription:
 *           type: string
 *         isActive:
 *           type: boolean
 */
/**
 * @swagger
 * /api/v1/product_category:
 *   get:
 *     tags: [Product Category]
 *     summary: Retrieve Product Category
 *     description: Retrieve all Product Category Characteristics. If `id` query parameter is provided, it returns a single Product Category characteristic. Otherwise, it returns all Product Category characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Product Category
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
 *                     $ref: '#/components/schemas/AllProductCategoryModel'
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
productCategoryRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Products"), ProductCategoryController.GetProductCategory);
/**
 * @swagger
 * /api/v1/product_category:
 *   post:
 *     summary: Create Product Category
 *     description: This API endpoint allows to Create a new Product Category.
 *     tags: [Product Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoryName:
 *                   type: string
 *                 shortDescription:
 *                   type: string
 *                   example: desc
 *                 isActive:
 *                   type: boolean
 *                   example: true
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
productCategoryRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Products"), ProductCategoryController.CreateProductCategory);
/**
 * @swagger
 * /api/v1/product_category:
 *   put:
 *     summary: Update Product Category
 *     description: This API endpoint allows to Update a Product Category.
 *     tags: [Product Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 categoryName:
 *                   type: string
 *                   example: 2
 *                 shortDescription:
 *                   type: string
 *                   example: 3
 *                 isActive:
 *                   type: boolean
 *                   example: 4
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
productCategoryRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "Products"), ProductCategoryController.UpdateProductCategory);
/**
 * @swagger
 * /api/v1/product_category/{id}:
 *   delete:
 *     summary: Delete Product Category
 *     description: This API endpoint deletes a Product Category on the provided ID.
 *     tags: [Product Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Product Category to delete
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
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
productCategoryRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "Products"), ProductCategoryController.DeleteProductCategory);
