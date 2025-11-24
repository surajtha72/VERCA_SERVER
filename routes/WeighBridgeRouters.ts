import express from "express";
import * as WeighBridgeController from "../controllers/WeighBridgeController";
import { VerifyToken, VerifyUser } from "../Authorization";

const weighBridgeRouter = express.Router();

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
weighBridgeRouter.get("/", VerifyToken, VerifyUser("Read", "WeighBridge"), WeighBridgeController.GetWeighBridge);
weighBridgeRouter.get("/get_transit_loss_gain_reports", VerifyToken, VerifyUser("Read", "WeighBridge"), WeighBridgeController.GetTransitLossGainReports);

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

weighBridgeRouter.post("/", VerifyToken, VerifyUser("Create", "WeighBridge"), WeighBridgeController.CreateWeighBridge);
weighBridgeRouter.post("/vehicle", VerifyToken, VerifyUser("Create", "WeighBridge"), WeighBridgeController.CreateWeighBridgeVehicle);

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
weighBridgeRouter.put("/", VerifyToken, VerifyUser("Update", "WeighBridge"), WeighBridgeController.UpdateWeighBridge);

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
weighBridgeRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "WeighBridge"), WeighBridgeController.DeleteWeighBridge);

export { weighBridgeRouter };