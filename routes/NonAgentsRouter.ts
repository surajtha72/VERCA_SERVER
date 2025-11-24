import * as express from "express";
import * as NonAgentsController from "../controllers/NonAgentsController";
import { VerifyToken, VerifyUser } from "../Authorization";
let nonAgentsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Non Agents
 *   description: Endpoints for Non Agents management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllNonAgentsModel:
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
 */


/**
 * @swagger
 * /api/v1/non-agents:
 *   get:
 *     tags: [Non Agents]
 *     summary: Retrieve Non Agents
 *     description: Retrieve all Non Agents.
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
 *                     $ref: '#/components/schemas/AllNonAgentsModel'
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
nonAgentsRouter.get(
  "/",
  VerifyToken,
  NonAgentsController.GetAllNonAgents
);

/**
 * @swagger
 * /api/v1/non-agents:
 *   post:
 *     summary: Create Non Agents
 *     description: This API endpoint allows to Create a new Non Agents.
 *     tags: [Non Agents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 parentId:
 *                   type: number
 *                   example: 1
 *                 addressLine1:
 *                   type: string
 *                   example: "address1"
 *                 addressLine2:
 *                   type: string
 *                   example: "address2"
 *                 stateId:
 *                   type: number
 *                   example: 1
 *                 districtId:
 *                   type: number
 *                   example: 1
 *                 vctId:
 *                   type: number
 *                   example: 1
 *                 geocode:
 *                   type: string
 *                   example: "geocode"
 *                 bankDetailsId:
 *                   type: number
 *                   example: "bankDetailsId"
 *                 accountNumber:
 *                   type: string
 *                   example: "accountNumber"
 *                 phoneNumber:
 *                   type: string
 *                   example: "phoneNumber"
 *                 ifscCode:
 *                   type: string
 *                   example: "ifscCode"
 *                 payrollType:
 *                   type: number
 *                   example: 1
 *                 routeType:
 *                   type: number
 *                   example: "routeType"
 *                 headload:
 *                   type: number
 *                   example: 1
 *                 commission:
 *                   type: number
 *                   example: 1
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
nonAgentsRouter.post("/",VerifyToken, NonAgentsController.CreateNonAgents);

/**
 * @swagger
 * /api/v1/non-agents:
 *   put:
 *     summary: Update Non Agents
 *     description: This API endpoint allows to Update an Non Agents.
 *     tags: [Non Agents]
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
 *                 parentId:
 *                   type: number
 *                   example: 1
 *                 addressLine1:
 *                   type: string
 *                   example: "address1"
 *                 addressLine2:
 *                   type: string
 *                   example: "address2"
 *                 stateId:
 *                   type: number
 *                   example: 1
 *                 districtId:
 *                   type: number
 *                   example: 1
 *                 vctId:
 *                   type: number
 *                   example: 1
 *                 geocode:
 *                   type: string
 *                   example: "geocode"
 *                 bankDetailsId:
 *                   type: number
 *                   example: "bankDetailsId"
 *                 accountNumber:
 *                   type: string
 *                   example: "accountNumber"
 *                 phoneNumber:
 *                   type: string
 *                   example: "phoneNumber"
 *                 ifscCode:
 *                   type: string
 *                   example: "ifscCode"
 *                 payrollType:
 *                   type: number
 *                   example: 1
 *                 routeType:
 *                   type: number
 *                   example: "routeType"
 *                 headload:
 *                   type: number
 *                   example: 1
 *                 commission:
 *                   type: number
 *                   example: 1
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
nonAgentsRouter.put("/",VerifyToken, NonAgentsController.UpdateNonAgents);

/**
 * @swagger
 * /api/v1/non-agnets/{id}:
 *   delete:
 *     summary: Delete Non Agents
 *     description: This API endpoint deletes a Farmer based on the provided ID.
 *     tags: [Non Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Farmer to delete
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
nonAgentsRouter.delete("/:id", VerifyToken, NonAgentsController.DeleteNonAgents);


export { nonAgentsRouter }