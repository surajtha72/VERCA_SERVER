import * as express from "express";
import * as  IncentiveMasterController from "../controllers/IncentiveMasterController";
import { VerifyToken, VerifyUser } from "../Authorization";
let incentiveRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: IncentiveMaster
 *   description: Endpoints for Incentive Master management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     All:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         stateCode:
 *           type: string
 */


/**
 * @swagger
 * /api/v1/incentive_master:
 *   get:
 *     tags: [IncentiveMaster]
 *     summary: Retrieve Incentive Master
 *     description: Retrieve All Incentive Master. If `id` query parameter is provided, it returns a single incentive master. Otherwise, it returns all incentive master.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the incentive master 
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
 *                     $ref: '#/components/schemas/AllIncentiveMasterModel'
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
incentiveRouter.get("/", VerifyToken, VerifyUser("Read", "IncentiveList"), IncentiveMasterController.GetAllIncentiveMaster);

/**
 * @swagger
 * /api/v1/incentive_master:
 *   post:
 *     summary: Create Incentive Master
 *     description: This API endpoint allows to Create a new incentive master.
 *     tags: [IncentiveMaster]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "incenitve"
 *                 stateCode:
 *                   type: string
 *                   example: "incentive"
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
incentiveRouter.post("/",VerifyToken, VerifyUser("Create", "IncentiveList"), IncentiveMasterController.CreateIncentiveMaster);

/**
 * @swagger
 * /api/v1/incentive_master:
 *   put:
 *     summary: Update a Incentive Master
 *     description: This API endpoint allows to Update a new incentive master.
 *     tags: [IncentiveMaster]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "incentiveType"
 *                 stateCode:
 *                   type: string
 *                   example: "incentiveType"
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
incentiveRouter.put("/",VerifyToken, VerifyUser("Update", "IncentiveList"), IncentiveMasterController.UpdateIncentiveMaster);

/**
 * @swagger
 * /api/v1/incentive_master/{id}:
 *   delete:
 *     summary: Delete Incentive Master
 *     description: This API endpoint deletes a Incentive master based on the provided ID.
 *     tags: [IncentiveMaster]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Incentive to delete
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
incentiveRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "IncentiveList"), IncentiveMasterController.DeleteIncentiveMaster);

export{incentiveRouter}
