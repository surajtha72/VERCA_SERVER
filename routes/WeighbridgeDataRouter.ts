import express from "express";
import * as WeighbridgeDataController from "../controllers/WeighbridgeDataController";
import { VerifyToken, VerifyUser } from "../Authorization";

const weighBridgeDataRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name:  Remote Weigh Bridge Data
 *   description: Endpoints for Remote Weigh Bridge Data
 */

/**
 * @swagger
 * /api/v1/get_weighbridge_data:
 *   get:
 *     tags: [Remote Weigh Bridge Data]
 *     summary: Get remote weighbridge Data
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the weighbridge
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
 *                     $ref: '#/components/schemas/GetWeighbridgeModel'
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
weighBridgeDataRouter.get("/", WeighbridgeDataController.GetWeighBridgeData);

/**
 * @swagger
 * /api/v1/get_weighbridge_data/lab:
 *   get:
 *     tags: [Remote Weigh Bridge Data]
 *     summary: Get remote weighbridge lab data
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the weighbridge
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
 *                     $ref: '#/components/schemas/GetWeighbridgeModel'
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
weighBridgeDataRouter.get("/lab", WeighbridgeDataController.GetWeighBridgeLabData);

/**
 * @swagger
 * components:
 *   schemas:
 *     AllWeighBridgeModel:
 *       type: object
 *       required:
 *         - id
 *         - weighbridgeNo
 *       properties:
 *         id:
 *           type: number
 *         weighbridgeData:
 *           type: number
 */

/**
 * @swagger
 * /api/v1/update_weighbridge_data:
 *   put:
 *     tags: [Remote Weigh Bridge Data]
 *     summary: Update Weigh Bridge
 *     description: Update a Weigh Bridge.
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                       weight:
 *                           type: integer
 *                           example: 1500
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
weighBridgeDataRouter.put("/", WeighbridgeDataController.UpdateWeighBridgeData);

/**
 * @swagger
 * /api/v1/update_weighbridge_data/lab:
 *   put:
 *     tags: [Remote Weigh Bridge Data]
 *     summary: Update Weighbridge lab data
 *     description: Update a Weighbridge lab data.
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                       fat:
 *                           type: integer
 *                           example: 4.2
 *                       snf:
 *                           type: integer
 *                           example: 8.3
 *                       clr:
 *                           type: integer
 *                           example: 27.8
 *                       protein:
 *                           type: integer
 *                           example: 3.18
 *                       lactose:
 *                           type: integer
 *                           example: 7.79
 *                       salt:
 *                           type: integer
 *                           example: 2.7
 *                       water:
 *                           type: integer
 *                           example: 1.3
 *                       temperature:
 *                           type: integer
 *                           example: 34.88
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
weighBridgeDataRouter.put("/lab", WeighbridgeDataController.UpdateWeighBridgeLabData);

export { weighBridgeDataRouter };