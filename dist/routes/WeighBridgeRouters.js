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
exports.weighBridgeRouter = void 0;
const express_1 = __importDefault(require("express"));
const WeighBridgeController = __importStar(require("../controllers/WeighBridgeController"));
const Authorization_1 = require("../Authorization");
const weighBridgeRouter = express_1.default.Router();
exports.weighBridgeRouter = weighBridgeRouter;
/**
 * @swagger
 * tags:
 *   name: Weigh Bridge
 *   description: Endpoints for Weigh Bridge
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllWeighBridgeModel:
 *       type: object
 *       required:
 *         - id
 *         - weighbridgeNo
 *         - vehicleNo
 *         - contractorCode
 *         - contractorName
 *         - challanNo
 *         - driverName
 *         - contactPerson
 *         - destination
 *         - purpose
 *         - supplierName
 *         - routeId
 *         - productCategory
 *         - productName
 *         - weightMode
 *         - tareWeight
 *         - tareDate
 *         - grossWeight
 *         - grossDate
 *         - netWeightKg
 *         - supplyQty
 *         - remarks
 *         - temparature
 *         - fat
 *         - snf
 *         - acidity
 *         - isActive
 *       properties:
 *         id:
 *           type: number
 *         weighbridgeNo:
 *           type: number
 *         vehicleNo:
 *           type: number
 *         contractorCode:
 *           type: string
 *         contractorName:
 *           type: string
 *         challanNo:
 *           type: string
 *         driverName:
 *           type: string
 *         contactPerson:
 *           type: string
 *         destination:
 *           type: string
 *         purpose:
 *           type: string
 *         supplierName:
 *           type: string
 *         routeId:
 *           type: number
 *         productCategory:
 *           type: number
 *         productName:
 *           type: string
 *         weightMode:
 *           type: string
 *         tareWeight:
 *           type: number
 *         tareDate:
 *           type: string
 *           format: date-time
 *         grossWeight:
 *           type: number
 *         grossDate:
 *           type: string
 *           format: date-time
 *         netWeightKg:
 *           type: number
 *         supplyQty:
 *           type: number
 *         remarks:
 *           type: string
 *         temparature:
 *           type: number
 *         fat:
 *           type: number
 *         snf:
 *           type: number
 *         acidity:
 *           type: number
 *         isActive:
 *           type: boolean
 */
/**
 * @swagger
 * /api/v1/weigh_bridge:
 *   get:
 *     tags: [Weigh Bridge]
 *     summary: Retrieve Weigh Bridge
 *     description: Retrieve all Weigh Bridge Characteristics. If `id` query parameter is provided, it returns a single Weigh Bridge characteristic. Otherwise, it returns all Weigh Bridge characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Weigh Bridge
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
 *                     $ref: '#/components/schemas/AllWeighBridgeModel'
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
weighBridgeRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "WeighBridge"), WeighBridgeController.GetWeighBridge);
weighBridgeRouter.get("/get_transit_loss_gain_reports", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "WeighBridge"), WeighBridgeController.GetTransitLossGainReports);
/**
 * @swagger
 * /api/v1/weigh_bridge:
 *   post:
 *     tags: [Weigh Bridge]
 *     summary: Create Weigh Bridge
 *     description: Create a new Weigh Bridge.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AllWeighBridgeModel'
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
weighBridgeRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "WeighBridge"), WeighBridgeController.CreateWeighBridge);
weighBridgeRouter.post("/vehicle", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "WeighBridge"), WeighBridgeController.CreateWeighBridgeVehicle);
/**
 * @swagger
 * /api/v1/weigh_bridge:
 *   put:
 *     tags: [Weigh Bridge]
 *     summary: Update Weigh Bridge
 *     description: Update a Weigh Bridge.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllWeighBridgeModel'
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
weighBridgeRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "WeighBridge"), WeighBridgeController.UpdateWeighBridge);
/**
 * @swagger
 * /api/v1/weigh_bridge/{id}:
 *   delete:
 *     tags: [Weigh Bridge]
 *     summary: Delete Weigh Bridge
 *     description: Delete a Weigh Bridge by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Weigh Bridge to delete
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
weighBridgeRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "WeighBridge"), WeighBridgeController.DeleteWeighBridge);
