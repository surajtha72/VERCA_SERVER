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
exports.financialYearRouter = void 0;
const express = __importStar(require("express"));
const FinancialYearController = __importStar(require("../controllers/FinancialYearController"));
const Authorization_1 = require("../Authorization");
let financialYearRouter = express.Router();
exports.financialYearRouter = financialYearRouter;
/**
 * @swagger
 * tags:
 *   name: Financial Year
 *   description: Endpoints for Financial Year management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllFinancialYearModel:
 *       type: object
 *       required:
 *         - pageIndex
 *         - totalPages
 *         - totalRecords
 *         - data
 *       properties:
 *         pageIndex:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         totalRecords:
 *           type: integer
 *         data:
 *           type: array
 *           example: []
 *
 *
 */
/**
 * @swagger
 * /api/v1/financial_year:
 *   get:
 *     tags: [Financial Year]
 *     summary: Retrieve Financial Year
 *     description: Retrieve All Financial Year. If `id` query parameter is provided, it returns a single Financial Year. Otherwise, it returns all Financial Year.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the roles
 *       - in: query
 *         name: pageIndex
 *         schema:
 *           type: integer
 *           required: true
 *         description: Index number of Page
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           required: true
 *         description: Number of records in each Page
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
 *                     $ref: '#/components/schemas/AllFinancialYearModel'
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
financialYearRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "FinancialYear"), FinancialYearController.GetAllFinancialYear);
/**
 * @swagger
 * /api/v1/financial_year:
 *   post:
 *     summary: Create Financial Year
 *     description: This API endpoint allows to Create a new Financial Year.
 *     tags: [Financial Year]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   example: '2023-07-06T15:30:00Z'
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   example: '2023-07-06T15:30:00Z'
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
financialYearRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "FinancialYear"), FinancialYearController.CreateFinancialYear);
/**
 * @swagger
 * /api/v1/financial_year:
 *   put:
 *     summary: Update Financial Year
 *     description: This API endpoint allows to Update a Financial Year.
 *     tags: [Financial Year]
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
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   example: '2023-07-06T15:30:00Z'
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   example: '2023-07-06T15:30:00Z'
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
financialYearRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "FinancialYear"), FinancialYearController.UpdateFinancialYear);
/**
 * @swagger
 * /api/v1/financial_year/{id}:
 *   delete:
 *     summary: Delete Financial Year
 *     description: This API endpoint deletes a Financial Year based on the provided ID.
 *     tags: [Financial Year]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Financial Year to delete
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
financialYearRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "FinancialYear"), FinancialYearController.DeleteFinancialYear);
