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
exports.dashboardRouter = void 0;
const express = __importStar(require("express"));
const DashboardController = __importStar(require("../controllers/DashboardController"));
const Authorization_1 = require("../Authorization");
let dashboardRouter = express.Router();
exports.dashboardRouter = dashboardRouter;
/**
 * @swagger
 * tags:
 *   name: Dashboard Milk Details
 *   description: Endpoints for Milk Collection Details management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllMilkCollectionDetailsModel:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: string
 *         milkCollectionId:
 *           type: string
 *         milkType:
 *           type: string
 *         operationType:
 *           type: string
 *         quantity:
 *           type: number
 *         fat:
 *           type: number
 *         snf:
 *           type: number
 *         weight:
 *           type: number
 *         canCount:
 *           type: number
 *         collectedFrom:
 *           type: number
 *         collectedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * /api/v1/get_milk_details_weight:
 *   get:
 *     tags: [Dashboard Milk Details]
 *     summary: Retrieve Milk Collection Details
 *     description: Retrieve All Milk Collection Details. If `id`, `milk collection id`, `milk type` or `operation type` query parameter is provided, it returns the particular filtered results. Otherwise, it returns all Milk Collections.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID of the Milk Collection Details
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
 *                     $ref: '#/components/schemas/AllMilkCollectionDetailsModel'
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
dashboardRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "MilkCollection"), DashboardController.GetOrganizationUnitWeights);
dashboardRouter.get("/bargraph_data", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "MilkCollection"), DashboardController.GetMorEveBargraphData);
dashboardRouter.get("/linegraph_data", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "MilkCollection"), DashboardController.GetLinneGraphData);
